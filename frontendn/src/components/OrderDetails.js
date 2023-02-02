import React,{useEffect}from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { saveShippingInfo } from '../actions/cartActions';
import { getOrder,clearErrors } from '../actions/orderAction';
import Loader from './Layout/Loader/Loader';
import MetaData from './Layout/MetaData';
import Shipping from './Orderfinal';

const OrderDetails = () => {
    const {order,error,loading}=useSelector((state)=>state.orderDetails);
    const dispatch=useDispatch();
    const {id}=useParams();
    useEffect(() => {
        if (error) {
          console.log(error);
          dispatch(clearErrors);
        }
    
        dispatch(getOrder(id));
      }, [dispatch, error]);
    
  return (
    <div>
     {loading?<Loader/>:<Section> 
        <MetaData title="Order Details"/>
         <h5>Order #{order._id}</h5>
         <b>Ship to:</b>
         <p>{order.shippingInfo&&order.shippingInfo.address}</p>
         <p>Pincode:{order.shippingInfo&&order.shippingInfo.pincode}</p>
         <p>Pincode:{order.shippingInfo&&order.shippingInfo.phoneNo}</p>
         <div>
            <p>Payment:</p>
            <p className={order.paymentInfo&&order.paymentInfo.status==="succeeded"?"greenColor":"redColor"}>{order.paymentInfo&&order.paymentInfo.status==="succeeded"?"PAID":"NOT PAID"}</p>
         </div>
         <div>
            <p className={order.orderStatus&& order.orderStatus==="Delivered"?"greenColor":"redColor"}>{order.orderStatus}</p>
          </div>
         {order.orderItems&&order.orderItems.map((item)=>( 
            <div>
                <img src={item.image} alt="product" />
                <Link to={`/product/${item.product}`}>{item.name}</Link>
                <span>
                    {item.quantity*item.price}
                </span>
            </div>
         ))}
         <div>
         
         <div>
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
          
        </Section>}
    </div>
  )
}

export default OrderDetails

const Section=styled.section`  
.greenColor{
  color:green
}
.redColor{
  color:red
}

`