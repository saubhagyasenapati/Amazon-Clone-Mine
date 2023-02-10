import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import styled from "styled-components";
import { clearErrors, getOrder, updateOrder } from "../../actions/orderAction";
import Loader from "../Layout/Loader/Loader";
import MetaData from "../Layout/MetaData";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { UPDATE_ORDER_RESET } from "../../constants/orderConstant";
import Sideboard from "./Sideboard";

const UpdateOrder = () => {
  const { order, error, loading } = useSelector((state) => state.orderDetails);
  const { isUpdated,error:updateError } = useSelector((state) => state.order);
  const dispatch = useDispatch();
  const { id } = useParams();
  const[status,setStatus]=useState("");
  const ProcessOrder=(e)=>{
        e.preventDefault();
        const myform=new FormData();

        myform.set("status",status);

        dispatch(updateOrder(id,myform))
  }
  useEffect(() => {
    if (error) {
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
      dispatch(clearErrors);
    }
    if (updateError) {
      toast(updateError, {
          position: "bottom-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
    dispatch(clearErrors);
  }
  if (isUpdated) {
    toast("Order Status Updated", {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
  dispatch({type:UPDATE_ORDER_RESET})
}
    dispatch(getOrder(id));
  }, [dispatch,error,isUpdated,updateError]);

  return (
    <div>
      {loading ? (
        <Loader />
      ) : (
        <Section>
          <MetaData title="Order Proccessing" />
          <div className="dashboard">
          <Sideboard/>
          <div className="box1">
            <h4>Order #{order._id}</h4>
            <b>Ship to:</b>
            <span>{order.shippingInfo && order.shippingInfo.address}</span>
            <span>
              Pincode:{order.shippingInfo && order.shippingInfo.pincode}
            </span>
            <span>
              Pincode:{order.shippingInfo && order.shippingInfo.phoneNo}
            </span>
            <div className="orderstats">
              <div>
                <b>Payment:</b>
                <b
                  className={
                    order.paymentInfo &&
                    order.paymentInfo.status === "succeeded"
                      ? "greenColor"
                      : "redColor"
                  }
                >
                  {order.paymentInfo && order.paymentInfo.status === "succeeded"
                    ? "PAID"
                    : "NOT PAID"}
                </b>
              </div>
              <div>
                <b>OrderStatus:</b>
                <b
                  className={
                    order.orderStatus && order.orderStatus === "Delivered"
                      ? "greenColor"
                      : "redColor"
                  }
                >
                  {order.orderStatus}
                </b>
              </div>
            </div>
            <hr />
            <div className="order">
              <div className="orderbox">
                {order.orderItems &&
                  order.orderItems.map((item) => (
                    <div className="orderitem">
                      <div>
                        <img src={item.image} alt="product" />
                      </div>
                      <div className="orderitemdetails">
                        <div>
                          <Link to={`/product/${item.product}`}>
                            {item.name}
                          </Link>
                        </div>
                        <div>
                          <p>
                            <b>Qty:</b>
                            {item.quantity}
                          </p>
                        </div>
                        <div>
                          <p>
                            <b>Total:</b> {item.quantity * item.price}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
              <div className="payment">
                <div >
                  <h1>Payment</h1>
                </div>
                <hr />
                <div className="charges">
                  <b>Subtotal:</b>
                  <span>{order.itemsPrice}</span>
                </div>
                <div className="charges">
                  <b>Shipping:</b>
                  <span>{order.shippingPrice}</span>
                </div>
                <div className="charges">
                  <b>Tax:</b>
                  <span>{order.taxPrice}</span>
                </div>
                <hr />
                <div className="charges">
                  <b>Total:</b>
                  <span>{order.totalPrice}</span>
                </div>
              </div>
            </div>
            <hr />
            <div className="processorder">
                <h3>Process Order</h3>
                <div>
                <select
                      className="form-select"
                      id="inputGroupSelect01"
                      value={status}
                      onChange={(e)=>setStatus(e.target.value)}
                    >
                      <option selected value="0">
                        Process Order
                      </option>
                      {order.orderStatus==="Processing"&&(
                     <option value="Shipped">Shipped</option>
                      )}
                      {order.orderStatus==="Shipped"&&(
                    <option value="Delivered">Delivered</option>
                      )}
                      <option value="Cancelled">Cancelled</option>
                    </select>
                </div>
                <div>
                <button disabled={loading?true:false||status===""?true:false} onClick={ProcessOrder}>Process Order</button>
                </div>
            
                  
            </div>
          </div>
          </div>
          
        </Section>
      )}
    </div>
  );
};

export default UpdateOrder;

const Section = styled.section`
  .dashboard {
    width: 100vw;
    max-width: 100%;
    display: grid;
    grid-template-columns: 1fr 5fr;
    
  }
  .greenColor {
    color: green;
  }
  .processorder{
    display:grid ;
    justify-content:center ;
    align-items:center ;
    div{
      margin-top:10px ;
    }
    button {
        margin-top: 10px;
        width: 100%;
        background-color: #ff9900;
        border: 1px solid;
        border-radius: 0.3rem;
        border-color: #a88734 #9c7e31 #846a29;
      }
  }
  .redColor {
    color: red;
  }
  .orderstats {
    display: flex;
    justify-content: space-between;
  }
  .box1 {
    border-radius: 2rem;
    border: 1px solid;
    padding: 1rem;
    margin: 2rem;
    .order{
     display:flex ;
     .orderbox{
        border-right: 1px solid;
     }
     .payment{
        padding-left:20px ;
     }
    }
    img {
      height: 200px;
      width: 200px;
      margin-top: 10px;
      margin-right: 10px;
    }
    .orderitem {
      display: flex;
      .orderitemdetails {
        display: grid;
        justify-content: space-evenly;
        div {
          padding: 20px;
        }
      }
    }
  }
`;
