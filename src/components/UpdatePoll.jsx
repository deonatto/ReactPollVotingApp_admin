import React from 'react';
import Sidebar from "./Sidebar/Sidebar";
import {useEffect, useState} from 'react'; 
import Axios from 'axios'; 
import {useHistory, useParams} from 'react-router-dom';
import { Form, Input, Button, Select} from 'antd';



const UpdatePoll = () => {
    let history = useHistory(); 
    const params = useParams()
    const[status,setStatus] = useState("");
    const [pollName, setPollName] = useState("");
    const [pollDesc, setPollDesc] = useState("");
    const [active, setActive] = useState(null);
    const id = params.id; 
    //check if user is loggedin and get session info from server
    useEffect(()=>{
        async function getPoll(){
            try{
                
                const response = await Axios.post("http://localhost:5000/getPoll",
                {
                    id:id
                }, {
                    headers:{'x-access-token': localStorage.getItem("user")}
                });
                if(!response.data.auth){
                    history.push('/login');
                }else{
                    setPollName(response.data.poll[0].poll_name)
                    setPollDesc(response.data.poll[0].poll_desc);
                    setActive(response.data.poll[0].active); 
                    

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
                console.log(error.config);
            };

        }
        
        getPoll();
          

    },[]);

    async function onFinish(values){
        try{
            
            const response = await Axios.post("http://localhost:5000/updatePoll",{
                id: id,
                poll_name: values.pollName,
                poll_desc: values.pollDesc,
                active : values.active === "yes" ? 1 : 0,
            });

            
            response.data.message && setStatus(response.data.message);
                
            
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
                        name="pollName"
                        rules={[
                            {
                            required: true,
                            message: 'Please input Poll Name!',
                            },
                        ]}
                        >
                            <Input placeholder = {pollName} prefix= "Poll Name: "/>
                        </Form.Item>
                        <Form.Item
                        name="pollDesc"
                        rules={[
                            {
                            required: true,
                            message: 'Please input Poll Description!',
                            },
                        ]}
                        >
                            <Input placeholder = {pollDesc} prefix= "Poll Description: "/>
                        </Form.Item>

                        <Form.Item label="Active" name = "active"
                        rules={[
                            {
                            required: true,
                            message: 'Please input a user type!',
                            },
                        ]}
                        >
                            
                                <Select placeholder = {active === 1? "Yes": "No"} style={{ width: 120 }}>
                                    <Select.Option value="yes">Yes</Select.Option>
                                    <Select.Option value="no">No</Select.Option>
                                </Select>
                            
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

export default UpdatePoll;
