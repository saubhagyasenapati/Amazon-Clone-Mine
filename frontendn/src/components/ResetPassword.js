
import React, { useState, useEffect, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styled from "styled-components";
import Loader from "./Layout/Loader/Loader";

import { clearErrors, resetPassword } from "../actions/userActions";


const ResetPassword = () => {
    const navigate = useNavigate();
  const dispatch = useDispatch();
  const{token}=useParams()
  const { error, loading, success} = useSelector(
    (state) => state.forgotPassword
  );
  const [NewPassword, setNewPassword] = useState("");
  const [ConfirmPassword, setConfirmPassword] = useState("");
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
    if(success){
        toast("Password Reset Successfully", {
            position: "bottom-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          });
          navigate("/login");
      }
 
  }, [error,success]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const myForm = new FormData();
        myForm.set("password", NewPassword);
        myForm.set("confirmPassword", ConfirmPassword);
    dispatch(resetPassword(token,myForm));
  };

  return (
    <Fragment>
      <Section>
      
        {loading ? (
          <Loader />
        ) : (
          <div className="login">
         
        <div className="box">  
            <form onSubmit={(event) => handleSubmit(event)}>
              <div className="signinbox">
                <h2>Reset Password</h2>
                <div className="input">
                  <h5>New Password</h5>
                  <input
                    type="password"
                    value={NewPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    size="30"
                  />
                </div>
                <div className="input">
                  <h5>Confirm Password</h5>
                  <input
                    type="password"
                    value={ConfirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    size="30"
                  />
                </div>
                <button type="submit">Reset Password</button>
               
              </div>
            </form>
            <ToastContainer />
          </div>
          </div>
         
        )}
      </Section>
    </Fragment>
  )
}

export default ResetPassword


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
    width:100%;
    height:100% ;
  }
  .box {
    border: 1px solid;
    width: 100%;
    height: 100%;
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
