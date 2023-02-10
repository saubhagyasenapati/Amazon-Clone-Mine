
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
import { clearErrors, deleteOrder, getAllOrder } from '../../actions/orderAction';
import { DELETE_ORDER_RESET } from '../../constants/orderConstant';


const OrderList = () => {
  const dispatch=useDispatch();
  const navigate=useNavigate();
   const {error,orders}=useSelector((state)=>state.allOrders);
   const {error:deleteError,isDeleted}=useSelector((state)=>state.order);
   const deleteOrderHandler=(id)=>{
       dispatch(deleteOrder(id))
 
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
           toast("Order Deleted Successfully", {
               position: "bottom-center",
               autoClose: 5000,
               hideProgressBar: false,
               closeOnClick: true,
               pauseOnHover: true,
               draggable: true,
               progress: undefined,
               theme: "dark",
             });
             navigate("/admin/orders")
           dispatch({type: DELETE_ORDER_RESET })
       }
       dispatch(getAllOrder())
   
   
   }, [dispatch,alert,error,deleteError,isDeleted])
   
    const columns = [
      { field: "id", headerName: "Order ID", flex:1 },
      { field: "status", headerName: "Status",minWidth:150,flex:0.5,
       cellClassName:(params)=>{
          return params.getValue(params.id,"status")==="Delivered"?"greenColor":"redColor";
       }     
  },
      { field: "itemQty", headerName: "Items Oty", type: "number" ,minWidth:150,flex:0.3 },
      { field: "amount", headerName: "Amount", type: "number" ,minWidth:270 ,flex:0.5},
        { field: "actions", headerName: "Actions", type: "number" ,minWidth:150 ,flex:0.3 ,sortable:false,
        renderCell:(params)=>{
            return (
                <Fragment>
                       <Link to={`/admin/order/${params.getValue(params.id,"id")}`}>
                   <EditIcon/>
                </Link>
                <Button onClick={()=>deleteOrderHandler(params.getValue(params.id,"id"))}><DeleteIcon/></Button>
                </Fragment>
              
            )
        }
    }
      ];

      const rows=[];
      orders&&orders.forEach((item)=>{
        rows.push({
           id:item._id,
           itemQty:item.orderItems.length,
           amount:item.totalPrice,
           status:item.orderStatus,
        })
     });
  return (
    <Section>
    <div className="dashboard">
     <Sideboard/>
     <div className="productListContainer">
         <h1 id="productListHeading">All Products</h1>
         <DataGrid rows={rows} columns={columns} pageSize={10} disableSelectionOnClick className='productListTable' autoHeight/>
     </div>
    </div>
    <ToastContainer/>
 </Section>
  )
}

export default OrderList


const Section=styled.section`  
  .dashboard {
    width: 100vw;
    max-width: 100%;
    display: grid;
    grid-template-columns: 1fr 5fr;
  }
  .redColor{
    color:red;
}
.greenColor{
    color:green;
}
  .MuiDataGrid-columnHeader{
    background-color:#262626 ;
    padding: 1vmax !important ;
}

.MuiDataGrid-columnHeader div{
    color:white ;
   font:500 1.1vmax !important;
}
`