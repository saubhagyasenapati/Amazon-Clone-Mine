import { DataGrid } from '@mui/x-data-grid'
import React, { Fragment } from 'react'
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '@mui/material';
import styled from 'styled-components';
import Sideboard from './Sideboard';
import { clearErrors, deleteProduct, getProductAdmin } from '../../actions/productAction';
import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { DELETE_PRODUCT_RESET } from '../productConstants';

const ProductList = () => {
    const dispatch=useDispatch();
   const navigate=useNavigate();
    const {error,products}=useSelector((state)=>state.products);
    const {error:deleteError,isDeleted}=useSelector((state)=>state.product);
    const deleteProductHandler=(id)=>{
        dispatch(deleteProduct(id))
      
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
            toast("Product Deleted Successfully", {
                position: "bottom-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
              });
              navigate("/admin/dashboard")
            dispatch( DELETE_PRODUCT_RESET )
        }
        dispatch(getProductAdmin())
    
    
    }, [dispatch,alert,error,deleteError,isDeleted])
    
    const columns = [
        { field: "id", headerName: "Product ID", flex:0.5,minWidth:200 },
        { field: "name", headerName: "Name",minWidth:350,flex:1   
    },
        { field: "stock", headerName: "Stock", type: "number" ,minWidth:150,flex:0.3 },
        { field: "price", headerName: "Price", type: "number" ,minWidth:270 ,flex:0.5},
        { field: "actions", headerName: "Actions", type: "number" ,minWidth:150 ,flex:0.3 ,sortable:false,
        renderCell:(params)=>{
            return (
                <Fragment>
                       <Link to={`/admin/product/${params.getValue(params.id,"id")}`}>
                   <EditIcon/>
                </Link>
                <Button onClick={()=>deleteProductHandler(params.getValue(params.id,"id"))}><DeleteIcon/></Button>
                </Fragment>
              
            )
        }
    }
      ];

      const rows=[];
      products&&products.forEach((item)=>{
        rows.push({
           id:item._id,
           stock:item.Stock,
           price:item.price,
           name:item.name,
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

export default ProductList


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
`