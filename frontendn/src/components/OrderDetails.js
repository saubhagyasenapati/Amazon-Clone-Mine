import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import styled from "styled-components";
import { getOrder, clearErrors } from "../actions/orderAction";
import Loader from "./Layout/Loader/Loader";
import MetaData from "./Layout/MetaData";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const OrderDetails = () => {
  const { order, error, loading } = useSelector((state) => state.orderDetails);
  const dispatch = useDispatch();
  const { id } = useParams();
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

    dispatch(getOrder(id));
  }, [dispatch, error,id]);

  return (
    <div>
      {loading ? (
        <Loader />
      ) : (
        <Section>
          <MetaData title="Order Details" />
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
                {order.orderStatus && order.orderStatus === "Cancelled" ? (
                  <b className="redColor">REFUNDED</b>
                ) : (
                  <b
                    className={
                      order.paymentInfo &&
                      order.paymentInfo.status === "succeeded"
                        ? "greenColor"
                        : "redColor"
                    }
                  >
                    {order.paymentInfo &&
                    order.paymentInfo.status === "succeeded"
                      ? "PAID"
                      : "NOT PAID"}
                  </b>
                )}
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
            {order.orderItems &&
              order.orderItems.map((item) => (
                <div className="orderitem">
                  <div>
                    <img src={item.image} alt="product" />
                  </div>
                  <div className="orderitemdetails">
                    <div>
                      <Link to={`/product/${item.product}`}>{item.name}</Link>
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
            <div></div>

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
          <ToastContainer/>
        </Section>
      )}
    </div>
  );
};

export default OrderDetails;

const Section = styled.section`
  .greenColor {
    color: green;
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
    img {
      height: 200px;
      width: 200px;
      margin-top: 10px;
      margin-right: 10px;
    }
    .orderitem {
      display: flex;
      .orderitemdetails {
        display: flex;
        justify-content: space-evenly;
        div {
          padding: 20px;
        }
      }
    }
  }
`;
