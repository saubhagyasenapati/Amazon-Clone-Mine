import { DataGrid } from '@mui/x-data-grid'
import React, { Fragment } from 'react'

import DeleteIcon from '@mui/icons-material/Delete';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '@mui/material';
import styled from 'styled-components';
import Sideboard from './Sideboard';
import { clearErrors, deleteReview, newReviews } from '../../actions/productAction';
import { useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { DELETE_REVIEWS_RESET } from '../productConstants';

const ProductReviews = () => {
    const dispatch=useDispatch();
   const navigate=useNavigate();
   const{id}=useParams()
    const {error:deleteError,isDeleted}=useSelector((state)=>state.reviews);
    const {error,reviews}=useSelector((state)=>state.productReviews);
    const deleteReviewHandler=(rid)=>{
        dispatch(deleteReview(rid,id))
        
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
            toast("Review Deleted Successfully", {
                position: "bottom-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
              });
              navigate(`/admin/reviews/${id}`)
            dispatch( {type:DELETE_REVIEWS_RESET} )
        }
        dispatch(newReviews(id))
    
    
    }, [dispatch,alert,error,deleteError,isDeleted])
    
    const columns = [
        { field: "id", headerName: "Review ID", flex:0.5,minWidth:200 },
        { field: "name", headerName: "Name",minWidth:150,flex:0.3   
    },
        { field: "comment", headerName: "Comment", minWidth:350,flex:1 },
        { field: "rating", headerName: "Rating", minWidth:270 ,flex:0.5,
        cellClassName:(params)=>{
            return params.getValue(params.id,"rating")>=3?"greenColor":"redColor";
        }
    },
        { field: "actions", headerName: "Actions", type: "number" ,minWidth:150 ,flex:0.3 ,sortable:false,
        renderCell:(params)=>{
            return (
                <Fragment>
                <Button onClick={()=>deleteReviewHandler(params.getValue(params.id,"id"))}><DeleteIcon/></Button>
                </Fragment>
              
            )
        }
    }
      ];

      const rows=[];
      reviews&&reviews.forEach((item)=>{
        rows.push({
           id:item._id,
           rating:item.rating,
           comment:item.comment,
           name:item.name,
        })
     });
  return (
    <Section>
       <div className="dashboard">
        <Sideboard/>
        <div className="productListContainer">
            <h1 id="productListHeading">All Reviews</h1>
            <DataGrid rows={rows} columns={columns} pageSize={10} disableSelectionOnClick className='productListTable' autoHeight/>
        </div>
       </div>
       <ToastContainer/>
    </Section>
  )
}

export default ProductReviews


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
.redColor{
    color:red;
    font-weight:600 ;
}
.greenColor{
    color:green;
    font-weight:600 ;
}
`