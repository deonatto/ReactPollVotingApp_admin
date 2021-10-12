import React from 'react';
import Sidebar from "./Sidebar/Sidebar";
import {useEffect, useState} from 'react'; 
import Axios from 'axios'; 
import {useHistory, useParams} from 'react-router-dom';
import { Form, Input, Button} from 'antd';


const UpdatePollOptions = () => {

    let history = useHistory(); 
    const params = useParams()
    const[status,setStatus] = useState("");
    const [optionName, setOptionName] = useState("");
    const [optionDesc, setOptionDesc] = useState("");
    const id = params.id; 

    //check if user is loggedin and get session info from server
    useEffect(()=>{
        async function getOption(){
            try{
                
                const response = await Axios.post("http://localhost:5000/getOption",
                {
                    id:id
                }, {
                    headers:{'x-access-token': localStorage.getItem("user")}
                });
                if(!response.data.auth){
                    history.push('/login');
                }else{
                    setOptionName(response.data.option[0].option_name)
                    setOptionDesc(response.data.option[0].option_description);
                    

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
        
        getOption();
          

    },[]);

    async function onFinish(values){
        try{
            
            const response = await Axios.post("http://localhost:5000/updateOption",{
                id: id,
                option_name: values.optionName,
                option_description: values.optionDesc,

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
                        name="optionName"
                        rules={[
                            {
                            required: true,
                            message: 'Please input Option Name!',
                            },
                        ]}
                        >
                            <Input placeholder = {optionName} prefix= "Option Name: "/>
                        </Form.Item>
                        <Form.Item
                        name="optionDesc"
                        rules={[
                            {
                            required: true,
                            message: 'Please input Option Description!',
                            },
                        ]}
                        >
                            <Input placeholder = {optionDesc} prefix= "Option Description: "/>
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

export default UpdatePollOptions;
