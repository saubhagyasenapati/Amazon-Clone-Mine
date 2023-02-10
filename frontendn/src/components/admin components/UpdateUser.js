import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import {
  clearErrors,
  getUserDetails,
  updateUser,
} from "../../actions/userActions";
import { UPDATE_USER_RESET } from "../../constants/userConstant";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import PersonIcon from "@mui/icons-material/Person";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import MetaData from "../Layout/MetaData";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Sideboard from "./Sideboard";
const UpdateUser = () => {
  const { error, user } = useSelector((state) => state.userDetails);
  const {
    error: updateError,
    loading: updateLoading,
    isUpdated,
  } = useSelector((state) => state.profile);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  useEffect(() => {
    if (user && user._id !== id) {
      dispatch(getUserDetails(id));
    } else {
      setName(user.name);
      setEmail(user.email);
      setRole(user.role);
    }
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
    if (updateError) {
      toast(updateError, {
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
    if (isUpdated) {
      toast("Updated Successfully", {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      navigate("/admin/users");
      dispatch({ type: UPDATE_USER_RESET });
    }
  }, [dispatch, error, navigate, isUpdated, updateError, user, id]);

  const updateUserSubmitHandler = (e) => {
    e.preventDefault();
    const myform = new FormData();

    myform.set("name", name);
    myform.set("email", email);
    myform.set("role", role);

    dispatch(updateUser(id, myform));
  };
  return (
    <Section>
      <MetaData title={"Update User Role"} />
      <div className="dashboard">
        <Sideboard />
        <div className="newUserContainer">
          <div className="profileheading">
            <h1>User Role Update</h1>
          </div>
          <div className="profileContainer">
            <div>
              <form className="createProductForm" encType="mutipart/form-data">
                <div>
                  <PersonIcon />
                  <input
                    type="text"
                    placeholder="Name"
                    value={name}
                    required
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div>
                  <MailOutlineIcon />
                  <input
                    placeholder="Email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <div>
                  <VerifiedUserIcon />
                  <select
                    onChange={(e) => setRole(e.target.value)}
                    value={role}
                  >
                    <option value="">Choose Role</option>
                    <option value="admin">Admin</option>
                    <option value="user">User</option>
                  </select>
                </div>

                <button
                  id="createProductBtn"
                  type="submit"
                  onClick={updateUserSubmitHandler}
                  disabled={
                    updateLoading ? true : false || role === "" ? true : false
                  }
                >
                  Update User
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </Section>
  );
};

export default UpdateUser;

const Section = styled.section`
  .newUserContainer {
    display: grid;
  }

  .dashboard {
    width: 100vw;
    max-width: 100%;
    display: grid;
    grid-template-columns: 1fr 5fr;
    border-right: solid 1px;
  }
  #createProductBtn {
    margin: 1rem 0rem;
    background-color: #ff9900;
    border: 1px solid;
    border-radius: 0.3rem;
    border-color: #a88734 #9c7e31 #846a29;
    .link {
      text-decoration: none;
      color: black;
    }
  }
`;
