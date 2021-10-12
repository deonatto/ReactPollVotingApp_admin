import React, {useState, useEffect} from 'react'; 
import { Form, Input, Button} from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import {useHistory, Link} from 'react-router-dom';
import Axios from 'axios'; 
import {MDBIcon } from 'mdbreact';


const Login = () => {
    let history = useHistory(); 
    //estado do login
    const[loginStatus,setLoginStatus] = useState("");

    useEffect(()=>{
        async function getAuth(){
            try{
                const response = await Axios.get("http://localhost:5000/verifyLogin", {
                    headers:{"x-access-token": localStorage.getItem("user")}
                });
                if(response.data.auth){
                    history.push("/");
                }
            }catch(error){
                console.log(error);
            }
        } 
        
        getAuth();
    },[]);


    async function onFinish(values){
        try{
            const email = values.email;
            const password = values.password;
            const response = await Axios.post("http://localhost:5000/login", {
                email,
                password,
            });
            if(response.data.message){
                setLoginStatus(response.data.message);
            }else{
                response.data.token && localStorage.setItem("user",response.data.token);
                history.push("/");
            }
            
            
    
        }catch(error){
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                if(error.response.status === 401){
                    setLoginStatus('Invalid credentials');
                }else if(error.response.data.err){
                    setLoginStatus(error.response.data.err);
                }
                else{
                    console.log(error.response.data);
                    console.log(error.response.status);
                    console.log(error.response.headers);
                    setLoginStatus('An error ocurred');

                }
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

    return (
        <div className = "login-container">
            <div className = "login-title-container" >
                <h1> <MDBIcon icon="sign-out-alt" /> Login</h1>
            </div>
            
            <div className = "message-container">
                <h4> {loginStatus}</h4>
            </div>
            <div className = "login-form-container">
                <Form name="normal_login" initialValues={{remember: true,}} onFinish={onFinish}>
                    <Form.Item name="email" rules={[{
                            required: true,
                            message: 'Please input your Email!',},]}>
                        <Input prefix={<UserOutlined className="site-form-item-icon" />} type ="email" placeholder="Email" />
                    </Form.Item>
                    <Form.Item name="password" rules={[{
                            required: true,
                            message: 'Please input your Password!',},]}>
                        <Input prefix={<LockOutlined className="site-form-item-icon" />} type="password" placeholder="Password"/>
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit" className="login-form-button">
                        Log in
                        </Button>
                    </Form.Item>
                </Form> 
  



            </div>
        </div>
    )
}

export default Login;
