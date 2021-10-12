import axios from "axios";
import { useEffect, useState } from "react";
import Sidebar from "./Sidebar/Sidebar";
import {useHistory} from 'react-router-dom';
import {MDBDataTable} from "mdbreact";
import { Button } from 'antd';
const Home = () => {

    let history = useHistory(); 
    const [users, setUsers] = useState([]);
    const [refresh, setRefresh] = useState(false);

    const data = {
        columns: [
          {
            label: 'First Name',
            field: 'fName',
            sort: 'asc',
            width: 150
          },
          {
            label: 'Last Name',
            field: 'lName',
            sort: 'asc',
            width: 270
          },
          {
            label: 'Email',
            field: 'email',
            sort: 'asc',
            width: 200
          },
          {
            label: 'Cartão do Cidadão',
            field: 'cc',
            sort: 'asc',
            width: 200
          },
          {
            label: 'User Type',
            field: 'user_type',
            sort: 'asc',
            width: 100
          },
          {
            label: 'Actions',
            field: 'actions',
            sort: 'asc',
            width: 100
          },
        ],
        rows: users
      };

    useEffect(()=>{
        const getUsers = async() =>{
            try{
                const users = await axios.get("http://localhost:5000/getUsers", {
                    headers:{"x-access-token": localStorage.getItem("user")}
                });
                if(!users.data.auth){
                    history.push('/login');
                }else{
                    setUsers(users.data.list.map((col)=>(
                        {
                            fName: col.fname,
                            lName: col.lname,
                            email: col.email,
                            cc: col.id_num,
                            user_type:col.role_id === 1? "Admin" : "User",
                            actions: <Button type="danger" onClick = {() =>deleteUser(col.id)}>Delete</Button>,
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
        getUsers();
    },[refresh]);

    const deleteUser = async (id) =>{
        try{
            const response = await axios.post("http://localhost:5000/deleteUser", {
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

export default Home;
