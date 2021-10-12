import React from 'react';
import { useParams, useHistory } from 'react-router-dom';
import axios from "axios";
import { useEffect, useState } from "react";
import Sidebar from "./Sidebar/Sidebar";
import {MDBDataTable} from "mdbreact";
import {Button} from 'antd';
import { Link } from "react-router-dom";

const PollOptions = () => {

    let history = useHistory(); 
    const params = useParams()
    const [pollOptions, setPollOptions] = useState([]);
    const [refresh, setRefresh] = useState(false);

    const data = {
        columns: [
          
              {
                label: 'Poll Option',
                field: 'poll_option',
                sort: 'asc',
                width: 270
              },
              {
                label: 'Option Description',
                field: 'option_desc',
                sort: 'asc',
                width: 270
              },
              {
                label: 'Actions',
                field: 'actions',
                sort: 'asc',
                width: 200
              },
          
        ],
        rows: pollOptions
      };

      useEffect(()=>{
        const getPollOptions = async() =>{
            try{
                const id = params.id; 
                const OptionList = await axios.post("http://localhost:5000/getOptions",{
                    id: id
                }
                ,{
                    headers:{"x-access-token": localStorage.getItem("user")}
                });
                console.log(OptionList.data.auth);
                if(!OptionList.data.auth){ 
                    history.push('/login');
                }else{
                    setPollOptions(OptionList.data.list.map((col)=>(
                        {
                            poll_option: col.option_name,
                            option_desc: col.option_description,
                            actions: [
                                <Button key = {col.id}><Link to = {"/updateOption/" + col.id}> Update </Link> </Button>," ",
                                <Button key = {col.id + 1} type="danger" onClick = {() =>deleteOption(col.id)}>Delete</Button>
                            ]
                            
                        }
                    )))
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
        getPollOptions();
    },[refresh]);

    const deleteOption = async (id) =>{
        try{
            const response = await axios.post("http://localhost:5000/deleteOption", {
                id: id
            });
            if(response.data.deleted){
                setRefresh(!refresh);
            }
        }catch(err){
            console.log(err);
        }
    }

    
         
    
    return (
        <div className = "main-container">
            <Sidebar/>
            <div className = "btable">
                <MDBDataTable
                    striped
                    bordered
                    hover
                    data={data}
                />
            </div>
        </div>
            
    )
}

export default PollOptions;
