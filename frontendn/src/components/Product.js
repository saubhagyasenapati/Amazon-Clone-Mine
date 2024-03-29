import React from "react";
import { Link } from "react-router-dom";
import ReactStars from "react-stars";
import styled from "styled-components";

function Product({ product }) {
  const options = {
    edit: false,
    value: product.rating,
    size: window.innerWidth < 1080 ? 10 : 25,
    isHalf: true,
  };
  return (
    <Section>
      <Link to={`/product/${product._id}`} className="product">
        <div>
          <img
            src={product.images[0].url}
            alt="productimage"
            className="product_img"
          />
          <div className="product_info">
            <p>{product.name}</p>
            <div className="rating">
              <ReactStars {...options} />
              <span className="reviews">{product.numOfReviews} Reviews</span>
            </div>

            <p className="product__price">
              <small>₹</small>
              <strong>{product.price}</strong>
            </p>
            <p>Free Delivery</p>
            <button>Add to Cart</button>
          </div>
        </div>
      </Link>
    </Section>
  );
}

export default Product;

const Section = styled.section`
  z-index: 1;
  margin: 10px;
  padding: 20px;
  background-color: white;
  max-height: 40vmax;
  max-width:50%;
  .product {
    width: 14vmax;
    display: flex;
    flex-direction: column;
    text-decoration: none;
    margin: 2vmax;
    padding-bottom: 05vmax;

    .product_img {
      width: 16vmax;
      height:15vmax;
      object-fit: contain;
      margin-bottom: 10px;
    }
    .product_info {
      margin-top: 15px;
      height: 200px;
      .product_price {
        font-weight: 700;
      }
      .rating {
        display: flex;
        flex-direction: row;
        .reviews {
          margin-left: 10px;
        }
      }
    }
  }
  button {
    width: 100%;
    background-color: #ff9900;
    border: 1px solid;
    border-radius: 0.3rem;
    border-color: #a88734 #9c7e31 #846a29;
  }
  
  @media screen and (max-device-width: 1080px){
    z-index: 1;
  margin: 5px;
  padding: 10px;
  background-color: white;
  height: 60vmax;
  .product {
    width: 14vmax;
    display: flex;
    flex-direction: column;
    text-decoration: none;
    margin: 2vmax;
    padding-bottom: 5vmax;

    .product_img {
      width: 15vmax;
      height:15vmax;
      object-fit: contain;
      margin-bottom: 10px;
    }
    .product_info {
      margin-top: 15px;
      height: 100px;
      p{
        font-size:12px;
        margin:2px;
      }
      .product_price {
        font-weight: 700;
      }
      .rating {
        display: flex;
        flex-direction: row;
        .reviews {
          margin-left: 10px;
          font-size:8px;
        }
      }
    }
  }
  button {
  font-size:10px;
  }
}
`;
