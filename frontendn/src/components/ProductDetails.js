import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import {
  clearErrors,
  getProductDetails,
  newReviewadd,
} from "../actions/productAction";
import { useParams } from "react-router-dom";
import ReactStars from "react-stars";
import ReviewCard from "./subcomponents/ReviewCard";
import Loader from "./Layout/Loader/Loader";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { addItemsToCart } from "../actions/cartActions";
import { Rating } from "@mui/material";
import { REVIEW_ADD_RESET } from "./productConstants";
import MetaData from "./Layout/MetaData";

const ProductDetails = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { products, loading, error } = useSelector(
    (state) => state.productDetails
  );
  const Stock=products.Stock>10?5:products.Stock;
  const s=[];
  for(var i=0;i<=Stock;i++){
    s.push(i);
  } 
  console.log(s);
  const { success, error: reviewError } = useSelector((state) => state.review);
  const [reviewadd, setreviewadd] = useState("");
  const [rating, setrating] = useState(0);

  const SubmitReview = async () => {
    const myForm = new FormData();
    myForm.set("productId", id);
    myForm.set("comment", reviewadd);
    myForm.set("rating", rating);
    dispatch(newReviewadd(myForm));
  };
  useEffect(() => {
    if (error) {
      toast(error, {
        position: "bottom-center",
        autoClose: 10000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      dispatch(clearErrors());
    }
    dispatch(getProductDetails(id));

    if (reviewError) {
      toast(reviewError, {
        position: "bottom-center",
        autoClose: 10000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      dispatch(clearErrors());
    }

    if (success) {
      toast("Review added Successfully", {
        position: "bottom-center",
        autoClose: 10000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      dispatch({ type: REVIEW_ADD_RESET });
    }
  }, [dispatch, error, success, reviewError]);

  const [value, setValue] = useState();

  const handleChange = (e) => {
    setValue(e.target.value);
  };
  const addToCartHandler = () => {
    dispatch(addItemsToCart(id, value));
  };

  const options = {
    edit: false,
    value: products.rating,
    size: window.innerWidth < 600 ? 20 : 25,
    isHalf: true,
  };

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Section>
           <MetaData title={`${products.name}`} />
          <div className="Product">
            <div id="carouselExample" className="carousel slide">
              <div className="carousel-inner">
                {products.images &&
                  products.images.map((item, i) => (
                    <div
                      className={i ? "carousel-item " : "carousel-item active"}
                      key={i}
                    >
                      <img
                        src={item.url}
                        className="d-block w-100 productimg"
                        alt="..."
                      />
                    </div>
                  ))}
              </div>
              <button
                className="carousel-control-prev"
                type="button"
                data-bs-target="#carouselExample"
                data-bs-slide="prev"
              >
                <span
                  className="carousel-control-prev-icon"
                  aria-hidden="true"
                ></span>
                <span className="visually-hidden">Previous</span>
              </button>
              <button
                className="carousel-control-next"
                type="button"
                data-bs-target="#carouselExample"
                data-bs-slide="next"
              >
                <span
                  className="carousel-control-next-icon"
                  aria-hidden="true"
                ></span>
                <span className="visually-hidden">Next</span>
              </button>
            </div>
            <div className="productdetails">
              <h1>{products.name}</h1>
              <h4>{products.description}</h4>
              <ReactStars {...options} />
              <span>{products.numOfReviews} Reviews</span>
              <h1>₹{products.price}</h1>
              <p>inclusive of Taxes</p>
              <p>
                Status:{" "}
                <b className={products.Stock < 1 ? "redColor" : "greenColor"}>
                  {products.Stock < 1 ? "OutOfStock" : "InStock"}
                </b>
              </p>
              <hr />
              <div className="icons">
                <div className="icon_each">
                  <img
                    src="https://m.media-amazon.com/images/G/31/A2I-Convert/mobile/IconFarm/trust_icon_free_shipping_81px._CB630870460_.png"
                    alt=""
                  />
                  <span>Free</span>
                  <span>Delivery</span>
                </div>
                <div className="icon_each">
                  <img
                    src="https://m.media-amazon.com/images/G/31/A2I-Convert/mobile/IconFarm/icon-returns._CB484059092_.png"
                    alt=""
                  />
                  <span>10 days</span>
                  <span>Replacement</span>
                </div>
                <div className="icon_each">
                  <img
                    src="https://m.media-amazon.com/images/G/31/A2I-Convert/mobile/IconFarm/icon-amazon-delivered._CB485933725_.png"
                    alt=""
                  />
                  <span>Amazon</span>
                  <span>Delivered</span>
                </div>
                <div className="icon_each">
                  <img
                    src="https://m.media-amazon.com/images/G/31/A2I-Convert/mobile/IconFarm/icon-warranty._CB485935626_.png"
                    alt=""
                  />
                  <span>2 Year </span>
                  <span>Warranty</span>
                </div>
              </div>
            </div>
            <div className="productAdd">
              <p>
                Delivery in<b> 2 Days</b>
              </p>
              <h1>₹{products.price}</h1>
              {products.Stock < 1 ? (
                <h1 className="redColor">Out Of Stock</h1>
              ) : (
                <>
                  <div class="input-group mb-3">
                    <label class="input-group-text" for="inputGroupSelect01">
                      quantity
                    </label>
                    <select
                      className="form-select"
                      id="inputGroupSelect01"
                      value={value}
                      onChange={handleChange}
                    >
                      {
                       s.map((i)=>{
                        return(<option value={i}>{i}</option>)
                       })
                      }
      
                    </select>
                  </div>
                  <button onClick={addToCartHandler}>Add to Cart</button>
                </>
              )}
            </div>
          </div>
          <hr />

          <div className="reviewsHead">
            <div className="addreview">
              <div>
                <h3>Review this product</h3>
                <div className="mb-3 row">
                  <label
                    for="inputPassword"
                    className="col-sm-2 col-form-label"
                  >
                    Add your review
                  </label>
                  <div className="col-sm-10">
                    <Rating
                      onChange={(e) => setrating(e.target.value)}
                      value={rating}
                      size="large"
                    />
                    <textarea
                      name="review"
                      cols="50"
                      onChange={(e) => setreviewadd(e.target.value)}
                      rows="7"
                      value={reviewadd}
                    ></textarea>
                    <button onClick={SubmitReview}>Add Review</button>
                  </div>
                </div>
              </div>
            </div>
            <div className="showreview">
              <h3>Top reviews from india</h3>
              {products.reviews && products.reviews[0] ? (
                <div className="reviews">
                  {products.reviews &&
                    products.reviews.map((review) => (
                      <ReviewCard review={review} />
                    ))}
                </div>
              ) : (
                <p className="Noreviews">No Reviews</p>
              )}
            </div>
          </div>
        </Section>
      )}
    </Fragment>
  );
};

export default ProductDetails;

const Section = styled.section`
  display: grid;
  grid-template-rows: 80% 20%;
  height: 100vh;
  background-color: white;
  .Product {
    display: grid;
    grid-template-columns: 35% 35% 20%;
    width: 100%;

    padding: 10px;
    .carousel {
      height: 90%;
      width: 100%;
    }
    .productimg {
      height: 35vmax;
      width: 35vmax;
      object-fit: contain;
    }
    .productdetails {
      margin-top: 10px;
      height: 100%;
      width: 100%;
      padding: 2rem;
      .redColor {
        color: red;
      }
      .greenColor {
        color: green;
      }
      .icons {
        display: flex;
        flex-direction: row;
        justify-content: space-evenly;
        .icon_each {
          display: flex;
          flex-direction: column;
          margin: 12px;
          img {
            height: 50px;
            width: 50px;
          }
        }
      }
    }
    .productAdd {
      position: relative;
      top: 20%;
      left: 10%;
      border: 1px solid;
      height: 50%;
      width: 100%;
      border-radius: 2rem;
      border-color: #d9d9d9;
      padding: 2rem;
      button {
        margin-top: 10px;
        width: 100%;
        background-color: #ff9900;
        border: 1px solid;
        border-radius: 0.3rem;
        border-color: #a88734 #9c7e31 #846a29;
      }
      .redColor {
        color: red;
      }
    }
  }
  .reviewsHead {
    display: grid;
    grid-template-columns: 35% 65%;
    background-color: white;
  }
  .addreview {
    border-right: 1px solid;
    height: 500px;
    margin-top: 1rem;
    padding: 1rem;
  }
  .showreview {
    margin-left: 1rem;
    margin-top: 1rem;
  }
  .Noreviews {
    font: 500 1.5vmax "Gill Sans";
  }
  hr {
    height: 1rem;
  }
`;
