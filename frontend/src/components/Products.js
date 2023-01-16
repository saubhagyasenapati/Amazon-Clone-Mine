import React, { Fragment, useEffect,useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { getProduct } from "../actions/productAction";
import Loader from "./Layout/Loader/Loader";
import Product from "./Product";
import { useParams } from "react-router-dom";
import Pagination from "react-js-pagination";
import { Slider, Typography } from "@mui/material";


const Products = () => {

  const categories=[
    "Mobile,Computer",
    "TV,Appliance,Electronics",
    "Fashion",
    "Home,Kitchen,Pets",
    "Beauty,Health,Grocery",
    "Books"
  ]

  const { keyword } = useParams();
  console.log(keyword);
  const dispatch = useDispatch();
  const { products, loading, error, productsCount,resultPerPage } = useSelector(
    (state) => state.products
  );
  const [currentPage, setcurrentPage] = useState(1);
  const [price, setprice] = useState([0,50000]);
  const [category, setcategory] = useState("");
  const [rating, setrating] = useState([0,5])
  const setCurrentPageNo=(e)=>{
   setcurrentPage(e);
  }
  const priceHandler=(event,newPrice)=>{
  setprice(newPrice);
  }
  const ratingHandler=(event,newRating)=>{
    setrating(newRating);
    }
  useEffect(() => {
    dispatch(getProduct(keyword,currentPage,price,category,rating));
  }, [dispatch, keyword,currentPage,price,category,rating]);

  return (
    <Section>
      <div className="Heading">
        <h2>Products</h2>
      </div>
      <div className="Products">
      <div className="filterBox">
        <Typography>Price</Typography>
        <Slider
  getAriaLabel={() => 'Temperature range'}
  value={price}
  onChange={priceHandler}
  valueLabelDisplay="auto"
  aria-labelledby="range-slider"
  min={0}
  max={50000}
/>
<div>
  <Typography>Rating</Typography>
  <Slider
  getAriaLabel={() => 'Temperature range'}
  value={rating}
  onChange={ratingHandler}
  valueLabelDisplay="auto"
  aria-labelledby="range-slider"
  min={0}
  step={1}
  max={5}
/>
</div>
<div>
  <h5>Category</h5>
  <ul className="categoryBox">
    {categories.map((category)=>(
      <li className="category-link" key={category} onClick={()=>setcategory(category)}>{category}</li>
    ))}
  </ul>
</div>
<Pagination
          activePage={currentPage}
          itemsCountPerPage={resultPerPage}
          totalItemsCount={productsCount}
          onChange={setCurrentPageNo}
          nextPageText="Next"
          prevPageText="Prev"
          firstPageText="1st"
          lastPageText="Last"
          itemClass="page-item"
          linkClass="page-link"
          activeClass="pageItemActive"
          activeLinkClass="pageLinkActive"
        />
      </div>
        {loading ? (
          <Loader />
        ) : (
          <div className="product">
            {products &&
              products.map((product, i) => (
                <div>
                  <Product key={i} product={product} />
                </div>
              ))}
          </div>
        )}
      </div>

      <div className="pagination">
     
        
      </div>
    </Section>
  );
};

export default Products;

const Section = styled.section`
  display: grid;
  grid-template-rows: 5vmax 95vmax ; 
  .Products {
    display: grid;
   grid-template-columns: 20vmax 80vmax;
    .product {
      display: grid;
      grid-template-columns: auto auto auto;
      margin: 10px;
    }
  }
  .pagination{
    display:flex ;
    justify-content:center ;
    align-items:center ;
    padding:5vmax ;

  }
  .filterBox{
    width:17vmax;
    margin:1rem
  }

  .categoryBox{
    padding:0 ;
    list-style:none ;
    margin:0.4vmax;
    cursor: pointer;
    transition:all 0.5s ;
    .category-link{
      padding:1px ;
     :hover{
      color: #ff9900;
     }
    }
  }

`;
