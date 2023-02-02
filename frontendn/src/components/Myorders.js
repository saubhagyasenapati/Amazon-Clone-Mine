import React, { useEffect } from "react";
import Loader from "./Layout/Loader/Loader";
import MetaData from "./Layout/MetaData";
import { DataGrid } from "@mui/x-data-grid";
import { Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, myOrder } from "../actions/orderAction";
import { minWidth } from "@mui/system";
import { Link } from "react-router-dom";
import LaunchIcon from '@mui/icons-material/Launch';
import styled from "styled-components";

const Myorders = () => {
  const dispatch = useDispatch();
  const { loading,error, orders } = useSelector((state) => state.myOrders);
  const { user } = useSelector((state) => state.user);
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
            <Link to={`/order/${params.getValue(params.id,"id")}`}>
                <LaunchIcon/>
            </Link>
        )
    }
}
  ];
  const rows = [];
  orders&&orders.forEach((item,index)=>{
     rows.push({
        itemQty:item.orderItems.length,
        id:item._id,
        status:item.orderStatus,
        amount:item.totalPrice,
     })
  });
 
  useEffect(() => {
    if (error) {
      console.log(error);
      dispatch(clearErrors);
    }

    dispatch(myOrder());
  }, [dispatch, error]);

  return (
    <div>
      <MetaData title={`${user.name}-Orders`} />
      {loading ? (
        <Loader />
      ) : (
        <Section className="myOrdersPage">
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={10}
            disableSelectionOnClick
            className="myOrdersTable"
            autoHeight
          />
          <Typography id="myOrdersHeading">{user.name}'s Orders</Typography>
        </Section>
      )}
    </div>
  );
};

export default Myorders;

const Section=styled.section`  
margin:2vmax;
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