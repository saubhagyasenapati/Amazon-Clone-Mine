// import e from 'express';
// import React, { Fragment,useState } from 'react'
// // import {logo} from '../../Assets/logo.png'

// import { Link } from 'react-router-dom'
// const SignUp = () => {
//     const[user,setUser]=useState({
//         name:"",
//         email:"",
//         password:"",
//     })
//     const{name,email,password}=user;
//     const[avatar,setAvatar]=useState();
//     const[avatarPreview,setAvatarPreview]=useState("");
//     const handleChange=()=>{
//         if(e.target.name==="avatar"){
//             const reader=new FileReader();
//             reader.onload=()=>{
//                 if(reader.readyState===2){
//                     setAvatarPreview(reader.result);
//                     setAvatar(reader.result)
//                 }
//             };
//             reader.readAsDataURL(e.target.files[0]);
//         }else{
//             setUser({...user,[e.target.name]:e.target.value})
//         }
//     }
//     const handleSubmit=(e)=>{
//      e.preventDefault();
//      const myForm=new FormData();
//      myForm.set("name",name);
//      myForm.set("email",email);
//      myForm.set("password",password);
//      myForm.set("avatar",avatar);

//     }
//   return (
//     <Fragment>
//         <form encType='mutipart/form-data' onSubmit={(event)=>handleSubmit(event)}>
//          <div className='brand'>
//              <h1>Amazon</h1>
//          </div>
//          <h1>Register</h1>
//         <input type="text" placeholder='Name' name="name" onChange={(e)=>handleChange(e)} />
//         <input type="email" placeholder='Email' name="email" onChange={(e)=>handleChange(e)} />
//         <input type="password" placeholder='Password' name="password" onChange={(e)=>handleChange(e)} />
//         <input type="file" placeholder='Image' name="avatar" onChange={handleChange} />
//         <button type="submit"> Create User</button>
//         <span>Already have an account?<Link to="/login">Login</Link></span>
//         </form>
//     </Fragment>
//   )
// }

// export default SignUp

import React,{useState,Fragment} from "react"
import { useDispatch, useSelector } from "react-redux";
import { Link } from 'react-router-dom'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { register } from "../../actions/userActions";
import Loader from "../Layout/Loader/Loader";
import styled from "styled-components";
import logo from "../../Assets/logo2.jpg";
const SignUp = () => {
  const dispatch=useDispatch();
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });
  const { error, loading, isAuthenticated } = useSelector(
    (state) => state.user
  );
  const { name, email, password } = user;
  const [avatar, setAvatar] = useState("");
  const [avatarPreview, setAvatarPreview] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    const myForm = new FormData();
    myForm.set("name", name);
    myForm.set("email", email);
    myForm.set("password", password);
    myForm.set("avatar", avatar);
    console.log(avatar);
    dispatch(register(myForm));
  };
  const handleChange = (e) => {
    if (e.target.name === "avatar") {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setAvatarPreview(reader.result);
          setAvatar(reader.result);
        }
      };
      reader.readAsDataURL(e.target.files[0]);
      setAvatar("photo")
    } else {
      setUser({ ...user, [e.target.name]: e.target.value });
    }
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
                <h5>Name</h5>
                <input
                  type="name"
                  value={name}
                  name="name"
                  onChange={(e) => handleChange(e)}
                  size="40"
                />
              </div>
              <div className="input">
                <h5>Email</h5>
                <input
                  type="email"
                  required
                  value={email}
                  name="email"
                  onChange={(e) => handleChange(e)}
                  min="3"
                  size="40"
                />
              </div>
              <div className="input">
                <h5>Password</h5>
                <input
                  type="password"
                  value={password}
                  name="password"
                  onChange={(e) => handleChange(e)}
                  size="40"
                />
              </div>
              <div className="input">
              <h5>Profile Picture</h5>
              <input type="file"  name="avatar" onChange={handleChange} />
              {!avatarPreview? <p>Choose image</p>:<img className="previewprofile" src={avatarPreview} alt="" />}
              
              </div>
              <button type="submit">Register</button>
              <span>
              Already have an account?<Link to="/login">Login</Link>
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

export default SignUp;


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
    height: 90%;
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
.previewprofile
  {
    height:150px ;
    width:150px ;
  }
`;