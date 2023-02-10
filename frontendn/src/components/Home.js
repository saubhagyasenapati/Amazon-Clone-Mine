import React, { Fragment, useEffect, useState } from "react";
import styled from "styled-components";
import MetaData from "./Layout/MetaData";
import Product from "./Product";
import { clearErrors, getProduct } from "../actions/productAction";
import { useSelector, useDispatch } from "react-redux";
import Loader from "./Layout/Loader/Loader";
import {ToastContainer,toast} from'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

function Home() {
  const dispatch = useDispatch();
  const { loading, error, products, productCount } = useSelector(
    (state) => state.products
  );
  const keyword = "", currentPage = 1, price=[0,50000], category="", rating=[0,5]
  useEffect(() => {
    dispatch(getProduct(keyword,currentPage,price,category,rating));
    if(error){
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
        dispatch(clearErrors())
    }
  }, [dispatch,error]);
 
  return (
    <Fragment>
      {loading?(
      <Loader />
      ):(
      <Section>
        <MetaData title={"Amazon"} />
        <div id="carouselExample" className="carousel slide">
          <div className="carousel-inner">
            <div className="carousel-item active">
              <img
                src="https://m.media-amazon.com/images/I/61GnAucagBL._SX3000_.png"
                alt="banner"
                className="home_image"
              />
            </div>
            <div className="carousel-item">
              <img
                src="https://m.media-amazon.com/images/I/61aURrton0L._SX3000_.jpg"
                alt="banner"
                className="home_image"
              />
            </div>
            <div className="carousel-item">
              <img
                src="https://m.media-amazon.com/images/I/61WE+jHT+QL._SX3000_.jpg"
                alt="banner"
                className="home_image"
              />
            </div>
            <div className="carousel-item">
              <img
                src="https://m.media-amazon.com/images/I/71vdTR50hFL._SX3000_.jpg"
                alt="banner"
                className="home_image"
              />
            </div>
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
      
       <div className="home_row">
          {products && products.map((product,i) => <Product key={i}product={product} />)}
       
        </div>
   
       
       
      </Section>
      )}
      <ToastContainer/>
    </Fragment>
  );
}

export default Home;

const Section = styled.section`
  .home_image {
    max-height: 70%;
    max-width: 100%;
    mask-image: linear-gradient(to bottom, rgba(0, 0, 0, 1), rgba(0, 0, 0, 0));
    margin-bottom:-50px ;
    
  }
 
  .home_row{
    position:relative ;
    display:flex ;
    margin:2vmax auto;
    width:90vw;
    flex-wrap:wrap ;
    z-index: 1;
    }
   
    
`;
