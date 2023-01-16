import React, { useState, useEffect, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { clearErrors, login } from "../../actions/userActions";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from "../Layout/Loader/Loader";
import styled from "styled-components";
import logo from "../../Assets/logo2.jpg";
// import {logo} from '../../Assets/logo.png'
const LogIn = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { error, loading, isAuthenticated } = useSelector(
    (state) => state.user
  );
  const [loginEmail, setloginEmail] = useState("");
  const [loginPassword, setloginPassword] = useState("");
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
      dispatch(clearErrors());
    }
    if (isAuthenticated) {
      navigate("/account");
    }
  }, [dispatch, error, isAuthenticated]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login(loginEmail, loginPassword));
    console.log("Submitted");
  };

  return (
    <Fragment>
      <Section>
      
        {loading ? (
          <Loader />
        ) : (
          <div className="login">
              <div>
          <img src={logo} alt="" />
        </div>
        <div className="box">  
            <form onSubmit={(event) => handleSubmit(event)}>
              <div className="signinbox">
                <h2>Sign In</h2>

                <div className="input">
                  <h5>Email</h5>
                  <input
                    type="email"
                    required
                    value={loginEmail}
                    onChange={(e) => setloginEmail(e.target.value)}
                    min="3"
                    size="40"
                  />
                </div>
                <div className="input">
                  <h5>Password</h5>
                  <input
                    type="password"
                    value={loginPassword}
                    onChange={(e) => setloginPassword(e.target.value)}
                    size="40"
                  />
                </div>
                <button type="submit">Log In</button>
                <span>
                Don't have an account?<Link to="/register">Register</Link>
              </span>
              </div>

             
            </form>
            <ToastContainer />
          </div>
          </div>
         
        )}
      </Section>
    </Fragment>
  );
};

export default LogIn;

const Section = styled.section`
  display: flex;
  align-items: center;
  background-color: white;
  flex-direction: column;
  
  width: 100vw;
  height: 100vh;
  img {
    width: 60%;
    height: 60%;
    object-fit:contain ;
    margin-left:2rem ;  
  }
  .login{
   margin:1rem ;
  }
  form{
    width:80%;
    height:100% ;
  }
  .box {
    border: 1px solid;
    width: 80%;
    height: 70%;
    border-radius: 1rem;
    padding: 20px;
    border-color: grey;
    display: flex;
  justify-content: center;
  align-items: center;
    .signinbox {
        
      .input{
        margin:5px;
      }
    }
  }
  span{
    display: flex;
  justify-content: center;
  align-items: center;
  }
  button{
    margin: 15px auto ;  
    display:grid ;
    width:100% ;
      background-color: #ff9900;
      border: 1px solid;
      border-radius: 0.3rem;
      border-color: #a88734 #9c7e31 #846a29;
  }
`;
