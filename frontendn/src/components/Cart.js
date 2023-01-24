import React, { Fragment } from "react";
import styled from "styled-components";
import CartItemCard from "./subcomponents/CartItemCard";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
const Cart = () => {
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.cart);
  const navigate=useNavigate();
  const checkoutHandler=()=>{
    navigate("/shipping")
  }
  console.log(cartItems);
  return (
    <Fragment>
      {cartItems.length === 0 ? (
        <center>
          <h2>NO ITEMS IN CART</h2>
        </center>
      ) : (
        <Section>
          <div className="cartcontainer">
            <h1>Shopping Cart</h1>
            <hr />
            {cartItems &&
              cartItems.map((item) => (
                <div>
                  <CartItemCard item={item} />
                  <hr />
                </div>
              ))}
              <div className="subtotalitems">
              <span className="subtotalmain">
              {`Subtotal( ${cartItems.reduce(
                (acc, item) => acc + 1,
                0
              )}items ):`}
              </span>
              <span className="subtotalfinal">{`₹${cartItems.reduce(
                (acc, item) => acc + item.quantity * item.price,
                0
              )}`}</span>
              </div>
              
          </div>
          <div className="subtotalcontainer">
            <p className="green"><img src="https://cdn-icons-png.flaticon.com/512/845/845646.png?w=740&t=st=1674401008~exp=1674401608~hmac=52451c06781bbb523cbe80ee03804c35ca8641f1f4d2916dbe960c40195f2cd8" alt="" /> Your item is eligible for free delivery</p>
            <div>
              <span className="subtotalmain">
              {`Subtotal( ${cartItems.reduce(
                (acc, item) => acc + 1,
                0
              )}items ):`}
              </span>
              <span className="subtotalfinal">{`₹${cartItems.reduce(
                (acc, item) => acc + item.quantity * item.price,
                0
              )}`}</span>
            </div>

            <button onClick={checkoutHandler}>Checkout</button>
          </div>
        </Section>
      )}
    </Fragment>
  );
};

export default Cart;

const Section = styled.section`
  display: grid;
  grid-template-columns: 70% 30%;
  margin: 1rem;
  .cartcontainer {
    background-color: white;
    margin: 1rem;
  }
  .subtotalcontainer {
    background-color: white;
    margin: 1rem;
    height: 20%;
    width: 90%;
    display: grid;
    padding: 1rem;
  }
  .subtotalfinal {
    font-weight: 700;
    font-size: 20px;
  }
  .subtotalmain{
    font-size: 20px;
  }
  .green{
    img{
        height:20px ;
        width:20px ;
    }
    font-size:16px ;
    color:green;
  }
  .subtotalitems{
    display:flex;
    justify-content:flex-end ;
    padding:1rem ;
  }
`;
