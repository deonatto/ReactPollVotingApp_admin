import { Form, Input, Button} from 'antd';
import { UserOutlined, LockOutlined,MailOutlined } from '@ant-design/icons';
import {MDBIcon } from 'mdbreact';
import {Link, useHistory} from 'react-router-dom';
import React, {useState, useEffect} from 'react'; 
import Axios from 'axios'; 

function Register(){
    //estado do login
    const[loginStatus,setLoginStatus] = useState("");
    let history = useHistory(); 

    useEffect(()=>{
        async function getAuth(){
            try{
                const response = await Axios.get("http://localhost:5000/verifyLogin", {
                    headers:{"x-access-token": localStorage.getItem("token")}
                });
                if(response.data.auth){
                    history.push("/");
                }
            }catch(error){
                console.log(error);
                setLoginStatus(error.response.data.message);
            }
        }
        
        getAuth();
    },[])

    async function onFinish(values){
        try{
            const username = values.username; 
            const password = values.password;
            const email = values.email;
            const response = await Axios.post("http://localhost:5000/register", {
                username,
                password,
                email
            });
            if(response.data.message){
                setLoginStatus(response.data.message);
            }else{
                setLoginStatus(response.data.err);
            }
    
        }catch(error){
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
                setLoginStatus('An error ocurred');
            } else if (error.request) {
                // The request was made but no response was received
                // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                // http.ClientRequest in node.js
                console.log(error.request);
                setLoginStatus('Error request');
            } else {
                // Something happened in setting up the request that triggered an Error
                console.log('Error', error.message);
                setLoginStatus('An error ocurred');
            }
            console.log(error.config);
        }
        
    };

    return(
        <div className = "login-container">
            <div className = "login-title-container" >
                <h1><MDBIcon far icon="registered" /> Register</h1>
            </div>
            <div className = "message-container">
                <h4> {loginStatus}</h4>
            </div>
            <div className = "login-form-container">
                <Form name="normal_login" initialValues={{remember: true,}} onFinish={onFinish}>
                    <Form.Item name="username" rules={[{
                            required: true,
                            message: 'Please input your Username!',},]}>
                        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
                    </Form.Item>
                    <Form.Item name="email" rules={[{
                            required: true,
                            message: 'Please input your Email!',},]}>
                        <Input prefix={<MailOutlined className="site-form-item-icon" />} placeholder="Email" />
                    </Form.Item>
                    <Form.Item name="password" rules={[{
                            required: true,
                            message: 'Please input your Password!',},]}>
                        <Input prefix={<LockOutlined className="site-form-item-icon" />} type="password" placeholder="Password"/>
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" className="login-form-button">
                        Register
                        </Button>
                        Or <Link to="/login">Login!</Link>
                    </Form.Item>
                </Form> 
  



            </div>

        </div>
        
    );
};

export default Register;
