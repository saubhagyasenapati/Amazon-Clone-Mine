import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { removefromcart } from "../../actions/cartActions";

const CartItemCard = ({ item }) => {
  const dispatch = useDispatch();
  const RemoveCardItem = (id) => {
    dispatch(removefromcart(item.product));
  };
  return (
    <Section>
      <Link to={`/product/${item.product}`}>
        <div className="image">
          <img src={item.image} alt="product image" />
        </div>
      </Link>
      <div className="productdetails">
        <div>
          <h4>
            <b>{item.name}</b>
          </h4>
        </div>
        <div>
          <p className="stock">inStock</p>
        </div>
        <div>
          <p>Eligible for FREE Shipping</p>
        </div>
        <div>
          <img
            src="https://m.media-amazon.com/images/G/31/marketing/fba/fba-badge_18px._CB485936079_.png"
            alt=""
          />
        </div>
        <div>
          <h5>Quantity:{item.quantity}</h5>
          <p className="remove" onClick={RemoveCardItem}>
            Remove
          </p>
        </div>
      </div>
      <div className="productprice">
        <h3>₹{item.quantity * item.price}</h3>
      </div>
    </Section>
  );
};

export default CartItemCard;

const Section = styled.section`
  display: grid;
  grid-template-columns: 30% 50% 20%;
  .image {
    img {
      object-fit: contain;
      height: 90%;
      width: 90%;
    }
  }
  .productdetails {
    .stock {
      color: green;
    }
    .remove {
      color: #80d4ff;
    }
  }
`;
