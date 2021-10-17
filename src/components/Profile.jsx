import React, {useEffect, useState} from 'react'; 
import Axios from 'axios'; 
import {useHistory} from 'react-router-dom';
import 'antd/dist/antd.css';
import { Form, Input, Button} from 'antd';
import Sidebar from './Sidebar/Sidebar';

const Profile = () => {
    
    let history = useHistory(); 

    const[status,setStatus] = useState("");

    const[id,setId] = useState("");
    const[fName,setFName] = useState("");
    const[lName,setLName] = useState("");
    const[email,setEmail] = useState("");
    const[id_num,setId_num] = useState("");
    


    useEffect(()=>{
        async function getProfile(){
            try{
                const response = await Axios.get("http://localhost:5000/profile", {
                    headers:{'x-access-token': localStorage.getItem("user")}
                });
                if(!response.data.auth){
                    history.push('/login');
                }else{
                    setId(response.data.id)
                    setFName(response.data.fname);
                    setLName(response.data.lname);
                    setEmail(response.data.email);
                    setId_num(response.data.id_num); 
                    

                }
            }catch(error){
                if (error.response) {
                    if(error.response.status === 401){
                        history.push('/login');
                        
                    }else{
                        setStatus(error.response.data.err);
                    }
                } else if (error.request) {
                  // The request was made but no response was received
                  // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                  // http.ClientRequest in node.js
                  console.log(error.request);
                  setStatus('An error ocurred');
                } else {
                  // Something happened in setting up the request that triggered an Error
                  console.log('Error', error.message);
                  setStatus('An error ocurred');
                }
            };

        }
        
        getProfile();
          

    },[]);

    
    // update user
    async function onFinish(values){
        try{
            const response = await Axios.post("http://localhost:5000/updateProfile",{
                id: id,
                fName: values.fName,
                lName: values.lName,
                email: values.email
                });
            
            if(response.data.message){
                setStatus(response.data.message);
            } 
            
            
        }catch(error){
            if (error.response) {
                if(error.response.data.err){
                    setStatus(error.response.data.err);
                }else{
                    // The request was made and the server responded with a status code
                    // that falls out of the range of 2xx
                    console.log(error.response.data);
                    console.log(error.response.status);
                    console.log(error.response.headers);
                    setStatus('An error ocurred');

                }
            } else if (error.request) {
              // The request was made but no response was received
              // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
              // http.ClientRequest in node.js
              console.log(error.request);
              setStatus('An error ocurred');
            } else {
              // Something happened in setting up the request that triggered an Error
              console.log('Error', error.message);
              setStatus('An error ocurred');
            }
            
        }
        
    };
    
    return(
        <div className = "main-container">
            <Sidebar/>
            <div className = "update-main-container">
                <div className = "update-message-container">
                    <h4> {status}</h4>
                </div>
                <div className = "update-form-container">
                
                    <Form name="normal_login" className="login-form" initialValues={{remember: true,}} onFinish={onFinish} >
                        <Form.Item
                        name="fName"
                        rules={[
                            {
                            required: true,
                            message: 'Please input your First Name!',
                            },
                        ]}
                        >
                            <Input prefix= "First Name: " placeholder={fName} />
                        </Form.Item>
                        <Form.Item
                        name="lName"
                        rules={[
                            {
                            required: true,
                            message: 'Please input your Last Name!',
                            },
                        ]}
                        >
                            <Input prefix= "Last Name: " placeholder={lName} />
                        </Form.Item>

                        <Form.Item
                        name="email"
                        rules={[
                            {
                            required: true,
                            message: 'Please input your email!',
                            },
                        ]}
                        >
                            <Input prefix= "Email: " placeholder={email} type ="email" />
                        </Form.Item>

                        <Form.Item
                        name="document"
                        >
                            <Input prefix= "Cartão do Cidadão: " placeholder={id_num} disabled />
                        </Form.Item>

                        <Form.Item>
                            <Button type="primary" htmlType="submit" className="login-form-button">
                                Update
                            </Button>
                        </Form.Item>
                    </Form>
                </div>

            </div>
            
            
            
        </div>
    );
}

export default Profile;
