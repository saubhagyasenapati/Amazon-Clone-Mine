import React from "react";
import styled from "styled-components";

const Shipping = () => {
  return (
    <Section>
      <div className="box1">
        <div className="box2">
        <div>
          <p className="orderplaced"> <img src="https://cdn-icons-png.flaticon.com/512/845/845646.png?w=740&t=st=1674401008~exp=1674401608~hmac=52451c06781bbb523cbe80ee03804c35ca8641f1f4d2916dbe960c40195f2cd8" alt="placedimage" />Order Placed,Thank You</p>
        </div>
        <div>
          <span>Shipping to </span>
          <span>Saubhagya Senapati:</span>
          <span>
            Vaishnavi Summit, Ground Floor, 7th Main, 80 Feet Road, 3rd Block,
            Koramangala Industrial Layout, Bangalore KA 560034 IN.
          </span>
        </div>
        <div>
          <p>Item Images</p>
        </div>
        </div>
       
      </div>
    </Section>
  );
};

export default Shipping;

const Section = styled.section`

.box1{
    margin:1rem ;
    border-radius:1.5rem ;
    border:solid #cccccc;
    background-color: #f2f2f2;
}

.box2{
    margin:1rem ;
    border-radius:1rem ;
    border:solid   #bfbfbf;
    background-color  :white ;
    padding:13px ;
}
.orderplaced{
    color:green ;
    font-size:24px ;
    font-weight:700 ;
    img{
        height:30px ;
        width:30px ;
    }
}
`;
