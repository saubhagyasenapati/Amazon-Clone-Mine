import React from "react";
import ReactStars from "react-stars";
import styled from "styled-components";

const ReviewCard = ({ review }) => {
  const options = {
    edit: false,
    value: review.rating,
    size: window.innerWidth < 600 ? 20 : 25,
    isHalf: true,
  };
  return (
    <Section>
      <div>
        <div className="profile">
        <img
          className="profilepic"
          src="https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          alt=""
        />
        <p>{review.name}</p>
        </div>
         <div>
          <ReactStars {...options} />
          <p>{review.comment}</p>
        <span>{review.date}</span>
        </div>
    
      
      </div>
    </Section>
  );
};

export default ReviewCard;

const Section = styled.section`

.profile{
  display:flex ;
  flex-direction:row ;
}
  .profilepic {
    height: 45px;
    width: 40px;
    border-radius:4rem ;
  }
`;
