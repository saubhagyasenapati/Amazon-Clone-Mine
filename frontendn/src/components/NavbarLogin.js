import React, { useState,useEffect } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import logo from "../Assets/logo.png";
import cart from "../Assets/cart.png";
import SearchIcon from "@mui/icons-material/Search";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Logout } from "../actions/userActions";
import {ToastContainer,toast} from'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

const NavbarLogin = ({user}) => {
    const [keyword, setkeyword] = useState("");
    const dispatch= useDispatch();
    const navigate = useNavigate();
    
    const { cartItems } = useSelector((state) => state.cart);
    const searchSubmitHandler = (e) => {
      e.preventDefault();
      if (keyword) {
        navigate(`/products/${keyword}`);
      } else {
        navigate("/products");
      }
    };
    const handleLogout=()=>{
       dispatch(Logout());
       navigate("/");
        toast("LogOut Successfull", {
          position: "bottom-center",
          autoClose: 10000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          });
      }
    
    return (
      <Section>
        <div className="header">
          <Link to="/">
            <img className="header_logo" src={logo} alt="Logo" />
          </Link>
          <div className="header_search">
            <input
              type="text"
              className="header_searchinput"
              onChange={(e) => setkeyword(e.target.value)}
            />
            <SearchIcon
              className="header_SearchIcon"
              onClick={searchSubmitHandler}
            />
          </div>
  
          <div className="header_nav">
            <Link to="/login" className="header_link">
              <div className="header_option">
                <span className="headeroption_lineone">Hello,</span>
                <span className="headeroption_linetwo">{user.name}</span>
              </div>
            </Link>
            <Link to="/login" className="header_link">
              <div className="header_option">
             <button onClick={handleLogout}>LOGOUT</button>
              </div>
            </Link>
            <Link to="/login" className="header_link">
              <div className="header_option">
                <span className="headeroption_lineone">Returns,</span>
                <span className="headeroption_linetwo">& Orders</span>
              </div>
            </Link>
            <Link to="/cart" className="header_link">
              <div className="header_optionBasket">
                <img src={cart} alt="cart" className="cart_img" />
                <span className="basketcount">{`${cartItems.reduce(
                (acc, item) => acc + 1,
                0
              )}`}</span>
                <span className="headeroption_lineone">Cart</span>
              </div>
            </Link>
          </div>
        </div>
        <div>
          <nav className="navbar navbar-expand-lg bg-dark ">
            <div className="container-fluid">
              <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                <div className="navbar-nav">
                  <Link className="nav-link active" to="/products">
                    All
                  </Link>
                  <a class="nav-link">Electronics</a>
                  <a class="nav-link">Home And Kitchen</a>
                  <a class="nav-link ">Fashion</a>
                </div>
              </div>
            </div>
          </nav>
        </div>
        <ToastContainer/>
      </Section>
    )
  }
  

export default NavbarLogin


const Section = styled.section`
  display: flex;
  flex-direction: column;
  .header {
    padding: 3px;
    background-color: #131921;
    display: flex;
    align-items: center;

    .header_logo {
      width: 100px;
      object-fit: contain;
      margin: 0 20px;
      margin-top: 18px;
    }
    .header_search {
      display: flex;
      flex: 1;
      .header_searchinput {
        height: 12px;
        padding: 10px;
        border: none;
        width: 90%;
      }
      .header_SearchIcon {
        padding: 5px;
        height: 22px;
        background-color: #ff9900;
      }
    }
    .header_nav {
      display: flex;
      justify-content: space-evenly;
      .header_link {
        color: white;
        text-decoration: none;
        .header_option {
          display: flex;
          flex-direction: column;
          margin-left: 10px;
          margin-right: 10px;
          .headeroption_lineone {
            font-size: 10px;
          }
          .headeroption_linetwo {
            font-weight: 700;
            font-size: 13px;
          }
        }
        .header_optionBasket {
          display: flex;
          margin-right: 15px;
          .basketcount {
            margin-left: 4px;
          }
          .cart_img {
            width: 30px;
            height: 30px;
          }
          .headeroption_lineone {
            font-weight: 800;
            font-size: 13px;
            position: relative;
            top: 15px;
          }
        }
      }
    }
  }
`;
