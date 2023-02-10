import { DataGrid } from '@mui/x-data-grid'
import React, { Fragment } from 'react'
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '@mui/material';
import styled from 'styled-components';
import Sideboard from './Sideboard';
import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { clearErrors, deleteUser, getAllUsers } from '../../actions/userActions';
import { DELETE_USER_RESET } from '../../constants/userConstant';

const UserList = () => {
    const dispatch=useDispatch();
   const navigate=useNavigate();
    const {error,users,loading}=useSelector((state)=>state.allUsers);
    const {error:deleteError,isDeleted,message}=useSelector((state)=>state.profile);
    const deleteUserHandler=(id)=>{
       
        dispatch(deleteUser(id))
      
    }
    useEffect(() => {
        if(error){
            toast(error, {
                position: "bottom-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
              });
            dispatch( clearErrors())
        }
        if(deleteError){
            toast(deleteError, {
                position: "bottom-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
              });
            dispatch( clearErrors())
        }
        if(isDeleted){
            toast(message, {
                position: "bottom-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
              });
              navigate("/admin/users")
            dispatch( {type:DELETE_USER_RESET} )
        }
        
        dispatch(getAllUsers())
    
    
    }, [dispatch,error,deleteError,isDeleted])
    
    const columns = [
        { field: "id", headerName: "User ID", flex:0.5,minWidth:200 },
        { field: "email", headerName: "Email",minWidth:350,flex:1   
    },
        { field: "name", headerName: "Name" ,minWidth:150,flex:0.3 },
        { field: "role", headerName: "Role" ,minWidth:270 ,flex:0.5,cellClassName:(params)=>{
            return params.getValue(params.id,"role")==="admin"?"greenColor":"yellowColor"
        }},
        { field: "actions", headerName: "Actions", type: "number" ,minWidth:150 ,flex:0.3 ,sortable:false,
        renderCell:(params)=>{
            return (
                <Fragment>
                       <Link to={`/admin/user/${params.getValue(params.id,"id")}`}>
                   <EditIcon/>
                </Link>
                <Button onClick={()=>deleteUserHandler(params.getValue(params.id,"id"))}><DeleteIcon/></Button>
                </Fragment>
              
            )
        }
    }
      ];

      const rows=[];
      users&&users.forEach((item)=>{
        rows.push({
           id:item._id,
           role:item.role,
           email:item.email,
           name:item.name,
        })
     });
  return (
    <Section>
       <div className="dashboard">
        <Sideboard/>
        <div className="productListContainer">
            <h1 id="productListHeading">All Users</h1>
            <DataGrid rows={rows} columns={columns} pageSize={10} disableSelectionOnClick className='productListTable' autoHeight/>
        </div>
       </div>
       <ToastContainer/>
    </Section>
  )
}

export default UserList


const Section=styled.section`  
  .dashboard {
    width: 100vw;
    max-width: 100%;
    display: grid;
    grid-template-columns: 1fr 5fr;
  }
  .MuiDataGrid-columnHeader{
    background-color:#262626 ;
    padding: 1vmax !important ;
}

.MuiDataGrid-columnHeader div{
    color:white ;
   font:500 1.1vmax !important;
}
.greenColor{
    color:green ;
}
.yellowColor{
    color:blue;
}
`