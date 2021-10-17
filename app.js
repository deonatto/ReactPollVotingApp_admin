require('dotenv').config();
const express = require('express');
const app = express(); 
const { makeDb } = require('mysql-async-simple');
const mysql = require('mysql');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require("bcryptjs");


//determines which origins are allowed to access server resources over CORS
app.use(cors());

//recognize the incoming Request Object as a JSON Object
app.use(express.json());

//connect to DB
const connection = mysql.createConnection({
    host: process.env.DB_HOST, 
    user: process.env.DB_USER, 
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
});

const db = makeDb();

try{
    db.connect(connection);
}catch(err){
    console.log(err);
}


//middleware to check authorization and redirect (no need of jwt payload)
const verifyLogin = (req,res,next) =>{
    const token = req.headers["x-access-token"]; 
    if(token === "null"){
        res.json({auth: false});
    }else{
        jwt.verify(token, process.env.JWT_SECRET, (err)=>{
            if(err){
                return res.status(401).json();
            }else{
                next();
            }
        });
    } 
};

//in post method returns undefined when token doesn`t exits. 
//middleware for authorization to pass payload of jwt to next middleware.
const verify = (req,res,next) =>{
    const token = req.headers['x-access-token']; 
    if(token === "null" || !token){
        res.json({auth:false});
    }else{
        jwt.verify(token, process.env.JWT_SECRET, (err, decoded)=>{
            if(err){
                console.log(err);
                return res.status(401).json();
            }else{
                res.locals.id = decoded.id;
                next();
            }
        });
    }
};

app.get('/verifyLogin', verifyLogin, (req,res)=>{
    res.json({auth: true}); 
});



// /////////////////////////// LOGIN ///////////////////////////////////////77
app.post('/login', async(req,res)=>{
    try{
        const email = req.body.email; 
        const password = req.body.password;
        const response = await db.query(connection,
            "SELECT * FROM users WHERE email=?",
            [email]);
        if(response.length > 0){
            const passwordIsValid = bcrypt.compareSync(
                password,
                response[0].password
            );
            if(passwordIsValid && response[0].role_id === 1){
                const id = response[0].id;
                const token = jwt.sign({id: id}, process.env.JWT_SECRET,{expiresIn: "120m"} );
                res.json({token: token});
            }else{
                res.send({message: "Wrong username/password"})
            }
            
        }else{
            res.send({message: "Wrong username/password"})
        }

    }catch(err){
        console.log(err);
        res.status(400).json({err: "An error ocurred"});
    } 

});

//    //////////////////////////////////////// ADMIN ROUTES //////////////////////////////////////////////
app.post('/createUser',async(req,res) =>{
    try{
        const fname = req.body.fName;
        const lname = req.body.lName;
        const email = req.body.email;
        const documentNumber = req.body.documentNumber;
        const hashed_password = bcrypt.hashSync(req.body.password, 8);
        const userType = req.body.userType === "Admin" ? 1 : 2;
        const updated_at = new Date();
        const created_at = new Date();
        const searchEmail = await db.query(connection, "SELECT * FROM users WHERE email=?",[email]);
        console.log(searchEmail.length);
        if(searchEmail.length > 0){
            res.json({message: "Email already exits"});
        }else{
            const response = await db.query(connection,"INSERT INTO users (fname,lname,email,id_type,role_id,id_num,created_at,updated_at,password) VALUES (?,?,?,?,?,?,?,?,?)",
            [fname,lname,email,1,userType,documentNumber,created_at,updated_at, hashed_password]);
            console.log(response);
            if(response){
                res.json({message: "User Created"});
            }

        }
    }catch(err){
        console.log(err);
        res.status(400).json({err: "An error ocurred, and user was not created"})
    }
});






//   //////////////////////////////////PROFILE ROUTES /////////////////////////////////////////

app.get('/profile', verify ,async (req,res)=>{
    try{
        const id = res.locals.id;
        
        const response = await db.query(connection,
            "SELECT * FROM users WHERE id=?",
            [id]);

        res.json({
            auth:true,
            id: id,
            fname: response[0].fname, 
            lname: response[0].lname,
            email: response[0].email,
            id_num: response[0].id_num
        })
    }catch(err){
        console.log(err);
        res.status(400).json({err: "Profile can´t be fetch"});
    }
     
    
});

app.post('/updateProfile',async(req,res) =>{
    try{
        const fname = req.body.fName;
        const lname = req.body.lName;
        const email = req.body.email;
        const updated_at = new Date();
        const id = req.body.id;
        const response = await db.query(connection,"UPDATE users SET fname=?,lname=?,email=?,updated_at=? WHERE id=?",
        [fname,lname,email,updated_at,id]);

        if(response.changedRows === 1 ){
            res.json({message: "User updated"});
        }else{
            res.json({message: "User can´t be updated"});
        }
    }catch(err){
        console.log(err);
        res.status(400).json({err: "An error ocurred, and user was not updated"})
    }
});

//update password
app.post('/pass',verify,async (req,res) =>{
    try{
        const id = res.locals.id;
        const getPassword = await db.query(connection,"SELECT * FROM users WHERE id=?",
        [id]);
        
        const password = req.body.password; 

        const passwordIsValid = bcrypt.compareSync(
            password,
            getPassword[0].password
        );

        if(passwordIsValid){
            const hashed_newPassword = bcrypt.hashSync(req.body.new_password, 8);
            await db.query(connection,"UPDATE users SET password=? WHERE id=?",
            [hashed_newPassword,id]);
            
            res.json(
                {
                    auth: true,
                    message: "Password updated"
                }
            );
            
        }else{
            res.json({
                auth: true,
                message: "Wrong password"});
        }
        
         
        
    }catch(err){
        console.log(err);
        res.status(400).json({err: "Password can´t be updated"});
    }
    
});


//  /////////////// USER ROUTES /////////////////////////////////////////

app.get('/getUsers',verify, async (req,res)=>{
    try{
        const response = await db.query(connection,"SELECT id,fname,lname,role_id,id_num,email FROM users");
        if(response){
            res.json(
                {
                    auth: true, 
                    list: response
                }
            );
        }
    }catch(err){
        res.status(400).json(err);
        console.log(err);
    }

});

app.post('/deleteUser',async(req,res)=>{
    try{
        const id = req.body.id; 
        const response = await db.query(connection,"DELETE from users WHERE id=?", [id]);
        if(response.affectedRows !== 0){
            res.json({deleted: true});
        }
    }catch(err){
        console.log(err);
    }
});


//   ///////////POLL ROUTES ////////////////////////////////////////////////////////////////

app.get('/getPolls',verify, async (req,res)=>{
    try{
        const response = await db.query(connection,"SELECT id,poll_name,poll_desc,active FROM polls");
        if(response){
            res.json(
                {
                    auth: true, 
                    list: response
                }
            );
        }
    }catch(err){
        res.status(400).json(err);
        console.log(err);
    }

});

//create poll route
app.post('/createPoll',async(req,res) =>{
    try{
        const poll_name = req.body.poll_name;
        const poll_desc = req.body.poll_desc;
        const active = 1;
        const updated_at = new Date();
        const created_at = new Date();
        const searchPoll = await db.query(connection, "SELECT * FROM polls WHERE poll_name=?",[poll_name]);
        if(searchPoll.length > 0){
            res.json({message: "Poll already exits"});
        }else{
            const response = await db.query(connection,"INSERT INTO polls (poll_name,poll_desc,active,created_at,updated_at) VALUES (?,?,?,?,?)",
            [poll_name,poll_desc,active,created_at,updated_at]);
            if(response){
                res.json({message: "Poll Created"});
            }

        }
    }catch(err){
        console.log(err);
        res.status(400).json({err: "An error ocurred, and poll was not created"})
    }
});

app.post('/deletePoll',async(req,res)=>{
    try{
        const id = req.body.id; 
        const response = await db.query(connection,"DELETE from polls WHERE id=?", [id]);
        if(response.affectedRows !== 0){
            res.json({deleted: true});
        }
    }catch(err){
        console.log(err);
    }
});

app.post('/getPoll', verify ,async (req,res)=>{
    try{
        const id = req.body.id;
        const response = await db.query(connection,
            "SELECT * FROM polls WHERE id=?",
            [id]);

        res.json({
            auth:true,
            poll: response
        })
    }catch(err){
        console.log(err);
        res.status(400).json({err: "Poll can´t be fetch"});
    }
     
    
});

//update poll
app.post('/updatePoll',async(req,res) =>{
    try{
        const poll_name = req.body.poll_name;
        const poll_desc = req.body.poll_desc;
        const active = req.body.active;
        const updated_at = new Date();
        const id = req.body.id;
        const response = await db.query(connection,"UPDATE polls SET poll_name=?,poll_desc=?,active=?,updated_at=? WHERE id=?",
        [poll_name,poll_desc,active,updated_at,id]);

        if(response.changedRows === 1 ){
            res.json({message: "Poll updated"});
        }else{
            res.json({message: "Poll can´t be updated"});
        }
    }catch(err){
        console.log(err);
        res.status(400).json({err: "An error ocurred, and poll was not updated"})
    }
});


//   ///////////////////////////POLL OPTIONS ROUTES //////////////////////////////////////////////
app.post('/getOptions',verify, async (req,res)=>{
    const id = req.body.id;
    try{
        const response = await db.query(connection,"SELECT id, option_name, option_description FROM poll_options WHERE poll_id=?", [id]);
        if(response){
            res.json(
                {
                    auth: true, 
                    list: response
                }
            );
        }
    }catch(err){
        res.status(400).json(err);
        console.log(err);
    }

});

app.post('/deleteOption',async(req,res)=>{
    try{
        const id = req.body.id; 
        const response = await db.query(connection,"DELETE from poll_options WHERE id=?", [id]);
        if(response.affectedRows !== 0){
            res.json({deleted: true});
        }
    }catch(err){
        console.log(err);
    }
});


app.post('/getOption', verify ,async (req,res)=>{
    try{
        const id = req.body.id;
        const response = await db.query(connection,
            "SELECT * FROM poll_options WHERE id=?",
            [id]);

        res.json({
            auth:true,
            option: response
        })
    }catch(err){
        console.log(err);
        res.status(400).json({err: "Option can´t be fetch"});
    }
     
    
});

//update option
app.post('/updateOption',async(req,res) =>{
    try{
        const option_name = req.body.option_name;
        const option_description = req.body.option_description;
        const updated_at = new Date();
        const id = req.body.id;
        const response = await db.query(connection,"UPDATE poll_options SET option_name=?,option_description=?,updated_at=? WHERE id=?",
        [option_name,option_description,updated_at,id]);

        if(response.changedRows === 1 ){
            res.json({message: "Option updated"});
        }else{
            res.json({message: "Option can´t be updated"});
        }
    }catch(err){
        console.log(err);
        res.status(400).json({err: "An error ocurred, and option was not updated"})
    }
});

//create poll option route
app.post('/createPollOption',async(req,res) =>{
    try{
        const poll_id = req.body.id;
        const option_name = req.body.option_name;
        const option_description = req.body.option_description;
        const updated_at = new Date();
        const created_at = new Date();
        const searchPoll = await db.query(connection, "SELECT * FROM poll_options WHERE option_name=? AND poll_id=?",[option_name, poll_id]);
        if(searchPoll.length > 0){
            res.json({message: "Poll Option already exits"});
        }else{
            const response = await db.query(connection,"INSERT INTO poll_options (poll_id,option_name,option_description,created_at,updated_at) VALUES (?,?,?,?,?)",
            [poll_id,option_name,option_description,created_at,updated_at]);
            if(response){
                res.json({message: "Poll Option Created"});
            }

        }
    }catch(err){
        console.log(err);
        res.status(400).json({err: "An error ocurred, and poll option was not created"})
    }
});

app.listen(5000, () =>{
    console.log("running on port 5000");
}); 
