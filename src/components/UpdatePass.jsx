import React, {useEffect, useState} from 'react'; 
import Axios from 'axios'; 
import {useHistory} from 'react-router-dom';
import 'antd/dist/antd.css';
import { LockOutlined } from '@ant-design/icons';
import { Form, Input, Button} from 'antd';
import Sidebar from './Sidebar/Sidebar';

const UpdatePass = () => {
    
    let history = useHistory(); 
    const[status,setStatus] = useState("");

   


    async function onFinish(values){
        try{
            if(values.new_password !== values.new_password_again){
                setStatus("Password do not match");
            }else{
                const response = await Axios.post("http://localhost:5000/pass", {
                    new_password:values.new_password,
                    password: values.password
                    },{
                        headers:{'x-access-token': localStorage.getItem("user")}
                    });
                if(!response.data.auth){
                    history.push('/login');
                }
                response.data.message && setStatus(response.data.message);
                
            }

        }catch(error){
                if (error.response) {
                    error.response.data.err && setStatus(error.response.data.err);

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

            <div className = "pass-main-container">
                <div className = "update-message-container">
                    <h4> {status}</h4>
                </div>
                <div className = "pass-form-container">
                
                    <Form name="normal_login" className="login-form" initialValues={{remember: true,}} onFinish={onFinish}>
                        <Form.Item
                        name="new_password"
                        rules={[
                            {
                            required: true,
                            message: 'Please input your New Password!',
                            },
                        ]}
                        >
                            <Input
                                prefix={<LockOutlined className="site-form-item-icon" />}
                                type="password"
                                placeholder="New Password"
                            />
                        </Form.Item>
                        <Form.Item
                        name="new_password_again"
                        rules={[
                            {
                            required: true,
                            message: 'Please input your New Password!',
                            },
                        ]}
                        >
                            <Input
                                prefix={<LockOutlined className="site-form-item-icon" />}
                                type="password"
                                placeholder="New Password"
                            />
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
                        <Form.Item>
                            <Button type="primary" htmlType="submit" className="login-form-button">
                                Update
                            </Button>
                        </Form.Item>
                    </Form>
                </div>

            </div>
            
        </div>
    )
}

export default UpdatePass;
