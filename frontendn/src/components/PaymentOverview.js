import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const PaymentOverview = () => {
  const { cartItems } = useSelector((state) => state.cart);
  const navigate=useNavigate()
  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.quantity * item.price,
    0
  );
  const shippingCharges = subtotal > 1000 ? 0 : 299;
  const tax = subtotal * 0.12;
  const totalPrice = subtotal + tax + shippingCharges;
  const orderInfo={
    shippingCharges,
    tax,
    totalPrice,
    subtotal
  }
  const submitHandler=()=>{
  sessionStorage.setItem("orderInfo",JSON.stringify(orderInfo));
    navigate("/order/paymentstripe")

  }
  return (
    <Section>
      <div className="box">
        <div>
          <h1>Payment</h1>
        </div>
        <hr />
        <div className="charges">
          <b>Subtotal:</b>
          <span>{subtotal}</span>
        </div>
        <div className="charges">
          <b>Shipping:</b>
          <span>{shippingCharges}</span>
        </div>
        <div className="charges">
          <b>Tax:</b>
          <span>{tax}</span>
        </div>
        <hr />
        <div className="charges">
          <b>Total:</b>
          <span>{totalPrice}</span>
        </div>
        <div>
          <button onClick={submitHandler}>Procced to Payment</button>
        </div>
      </div>
    </Section>
  );
};

export default PaymentOverview;

const Section = styled.section`
  display: flex;
  align-items: center;
  flex-direction: column;
  margin: 2rem;
  .box {
    border: 1px solid;
    border-radius: 1rem;
    padding: 70px;
    border-color: grey;
    display: grid;
    align-items: center;
    justify-content: center;
  }
  button {
    margin: 18px auto;
    display: grid;
    width: 100%;
    background-color: #ff9900;
    border: 1px solid;
    border-radius: 0.3rem;
    border-color: #a88734 #9c7e31 #846a29;
  }
  .charges {
    display: flex;
    margin: 15px 0;
    width:100% ;
    justify-content: space-between;
    span{
      color: #262626;
    }
  }
`;
