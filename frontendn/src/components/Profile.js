import React, { Fragment, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import Loader from "./Layout/Loader/Loader";
import MetaData from "./Layout/MetaData";

const Profile = () => {
  const { user, loading, isAuthenticated } = useSelector((state) => state.user);
  const navigate = useNavigate();
  useEffect(() => {
    if (isAuthenticated === false) {
      navigate("/login");
    }
  }, [isAuthenticated]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Section>
          <MetaData title={`${user.name}'s Profile`} />
          <div className="profileheading">
            <h1>My Profile</h1>
          </div>
          <div className="profileContainer">
            <div className="profileimage">
              <div>
                <img src={user.avatar.url} alt={user.name} />
              </div>
              <div>
                <button className="amazonbutton">
                  <Link className="link" to="/updateProfile">
                    Edit Profile
                  </Link>
                </button>
              </div>
            </div>
            <div>
              <div>
                <h4>Full Name</h4>
                <p>{user.name}</p>
              </div>
              <div>
                <h4>Email</h4>
                <p>{user.email}</p>
              </div>
              <div>
                <h4>Joined On</h4>
                <p>{String(user.createdAt).substring(0, 10)}</p>
              </div>
              <div>
                <div>
                  <button className="amazonbutton">
                    <Link className="link" to="/myorders">
                      My Orders
                    </Link>
                  </button>
                </div>
                <div>
                  <button className="amazonbutton">
                    <Link className="link" to="/password/update">
                      Change Password
                    </Link>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Section>
      )}
    </Fragment>
  );
};

export default Profile;

const Section = styled.section`
  .profileheading {
    margin: 1rem;
  }
  .profileContainer {
    display: grid;
    grid-template-columns: 20% 80%;
    .profileimage {
      margin-left: 1rem;
    }
    .amazonbutton {
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
  }
`;
