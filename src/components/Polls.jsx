import axios from "axios";
import { useEffect, useState } from "react";
import Sidebar from "./Sidebar/Sidebar";
import {useHistory} from 'react-router-dom';
import {MDBDataTable} from "mdbreact";
import { Button } from 'antd';
import { Link } from "react-router-dom";

const Polls = () => {

    let history = useHistory(); 
    const [polls, setPolls] = useState([]);
    const [refresh, setRefresh] = useState(false);

    const data = {
        columns: [
          
            {
                label: 'Name',
                field: 'name',
                sort: 'asc',
                width: 150
              },
              {
                label: 'Poll Description',
                field: 'poll_desc',
                sort: 'asc',
                width: 270
              },
              {
                label: 'Active',
                field: 'active',
                sort: 'asc',
                width: 200
              },
              {
                label: 'Actions',
                field: 'actions',
                sort: 'asc',
                width: 100
              },
          
        ],
        rows: polls
      };

    useEffect(()=>{
        const getPolls = async() =>{
            try{
                const pollList = await axios.get("http://localhost:5000/getPolls", {
                    headers:{"x-access-token": localStorage.getItem("user")}
                });
                if(!pollList.data.auth){
                    history.push('/login');
                }else{
                    setPolls(pollList.data.list.map((col)=>(
                        {
                            name: col.poll_name,
                            poll_desc: col.poll_desc,
                            active: col.active === 1? 'Yes' : 'No',
                            actions: [
                                <Button key = {col.id}><Link to = {"/updatePoll/" + col.id}> Update </Link> </Button>," ",
                                <Button key = {col.id + 1}><Link to = {"/createPollOption/" + col.id}> Create Poll Option </Link> </Button>," ",
                                <Button key = {col.id + 2}><Link to = {"/pollOptions/" + col.id}> Poll Options </Link> </Button>," ",
                                <Button key = {col.id + 3} type="danger" onClick = {() =>deletePoll(col.id)}>Delete</Button>
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
        getPolls();
    },[refresh]);

    const deletePoll = async (id) =>{
        try{
            const response = await axios.post("http://localhost:5000/deletePoll", {
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

export default Polls;