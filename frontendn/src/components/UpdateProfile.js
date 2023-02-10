import React, { useState, useEffect, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styled from "styled-components";
import { clearErrors, loadUser, updateProfile } from "../actions/userActions";
import Loader from "./Layout/Loader/Loader";
import { UPDATE_PROFILE_RESET } from "../constants/userConstant";
const UpdateProfile = () => {
    const navigate=useNavigate();
    const dispatch=useDispatch();
    const {user}=useSelector((state)=>state.user);
    const {error,isUpdated,loading}=useSelector((state)=>state.profile);
    const [name, setname] = useState("");
    const [email, setemail] = useState("");
    const [avatar, setAvatar] = useState();
    const [avatarPreview, setAvatarPreview] = useState("https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png")
    const handleSubmit = (e) => {
        e.preventDefault();
        const myForm = new FormData();
        myForm.set("name", name);
        myForm.set("email", email);
        myForm.set("avatar", avatar);
        dispatch(updateProfile(myForm));
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
        }
      };
      useEffect(() => {

        if(user){
          setname(user.name);
          setemail(user.email);
          setAvatarPreview(user.avatar.url)
        }
        if(error){
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

           dispatch(clearErrors())
        }
        if(isUpdated){
          toast("Profile Updated", {
            position: "bottom-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          });
           dispatch(loadUser());
           navigate("/account");
           dispatch({
            type:UPDATE_PROFILE_RESET
           })
        }
      
      }, [dispatch,error,isUpdated])
      
  return (
    <div>
       <Fragment>
    <Section>
      {loading ? (
        <Loader />
      ) : (
        <div className="login">
       <h1>Update Profile</h1>
      <div className="box">  
          <form onSubmit={(event) => handleSubmit(event)}>
        
            <div className="signinbox">
             
              <div className="input">
                <h5>Name</h5>
                <input
                  type="name"
                  value={name}
                  name="name"
                  onChange={(e) => setname(e.target.value)}
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
                  onChange={(e) => setemail(e.target.value)}
                  min="3"
                  size="40"
                />
              </div>
         
              <div className="input">
              <h5>Profile Picture</h5>
              <input type="file"  name="avatar" onChange={handleChange} />
              <img className="previewprofile" src={avatarPreview} alt="" />
              
              </div>
              <button type="submit">Save Changes</button>
            
            </div>

           
          </form>
          <ToastContainer />
        </div>
        </div>
       
      )}
    </Section>
  </Fragment>
    </div>
  )
}

export default UpdateProfile



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