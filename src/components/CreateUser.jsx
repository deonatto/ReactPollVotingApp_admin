import Sidebar from "./Sidebar/Sidebar";
import React, {useEffect, useState} from 'react'; 
import Axios from 'axios'; 
import {useHistory} from 'react-router-dom';
import 'antd/dist/antd.css';
import { Form, Input, Button, Select} from 'antd';
import { LockOutlined } from '@ant-design/icons';

const CreateUser = () => {
    let history = useHistory(); 
    const[status,setStatus] = useState("");

    useEffect(()=>{
        async function getAuth(){
            try{
                const response = await Axios.get("http://localhost:5000/verifyLogin", {
                    headers:{"x-access-token": localStorage.getItem("user")}
                });
                if(!response.data.auth){
                    history.push("/login");
                }
            }catch(error){
                if (error.response) {
                    if(error.response.status === 401){
                        history.push('/login');
                        
                    }else{
                        console.log(error.response)
                    }
                } else if (error.request) {
                  // The request was made but no response was received
                  // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                  // http.ClientRequest in node.js
                  console.log(error.request);
                } else {
                  // Something happened in setting up the request that triggered an Error
                  console.log('Error', error.message);
                }
            }
        }
        
        getAuth();
    },[])

    async function onFinish(values){
        try{
            console.log(values);
            
            if(values.password !== values.password_again){
                setStatus("Password do not match");
            }else{
                const response = await Axios.post("http://localhost:5000/createUser",{
                fName: values.fName,
                lName: values.lName,
                email: values.email, 
                documentNumber: values.document_number,
                password: values.password,
                userType: values.user_type
                });

                
                response.data.message && setStatus(response.data.message);
                
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
            console.log(error.config);
        }
        
    };

    return (
        <div className = "main-container">
            <Sidebar/>
            <div className = "update-main-container">
                <div className = "update-message-container">
                    <h4> {status}</h4>
                </div>
                <div className = "update-form-container">
                
                    <Form name="normal_login" className="login-form" initialValues={{remember: true,}} onFinish={onFinish}>
                        <Form.Item
                        name="fName"
                        rules={[
                            {
                            required: true,
                            message: 'Please input your First Name!',
                            },
                        ]}
                        >
                            <Input prefix= "First Name: "/>
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
                            <Input prefix= "Last Name: "/>
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
                            <Input prefix= "Email: " type ="email" />
                        </Form.Item>

                        <Form.Item name="document_number"
                        rules={[
                            {
                            required: true,
                            message: 'Please input document number!',
                            },
                        ]}
                        >
                            <Input prefix= "Cartão do Cidadão: "/>
                            
                        </Form.Item>

                        <Form.Item
                        name="password"
                        rules={[
                            {
                            required: true,
                            message: 'Please input your Password!',
                            },
                        ]}
                        >
                            <Input
                                prefix={<LockOutlined className="site-form-item-icon" />}
                                type="password"
                                placeholder="Password"
                            />
                        </Form.Item>

                        <Form.Item
                        name="password_again"
                        rules={[
                            {
                            required: true,
                            message: 'Please input your Password!',
                            },
                        ]}
                        >
                            <Input
                                prefix={<LockOutlined className="site-form-item-icon" />}
                                type="password"
                                placeholder="Repeat Password"
                            />
                        </Form.Item>

                        <Form.Item label="User Type" name = "user_type"
                        rules={[
                            {
                            required: true,
                            message: 'Please input a user type!',
                            },
                        ]}
                        >
                            
                                <Select style={{ width: 120 }}>
                                    <Select.Option value="Admin">Admin</Select.Option>
                                    <Select.Option value="user">User</Select.Option>
                                </Select>
                            
                        </Form.Item>
                
                        <Form.Item>
                            <Button type="primary" htmlType="submit" className="login-form-button">
                                Create
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        </div>
    )
}

export default CreateUser; 
