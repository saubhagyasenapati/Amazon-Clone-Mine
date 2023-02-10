import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";

const Shipping = () => {
  const {shippingInfo}=useSelector((state)=>state.cart)
  const {user}=useSelector((state)=>state.user);
  const cartItems=JSON.parse(localStorage.getItem("cartItemsfinal"))  ;
  return (
    <Section>
      <div className="box1">
        <div className="box2">
        <div className="rightTick">
          <p className="orderplaced"> <img src="https://cdn-icons-png.flaticon.com/512/845/845646.png?w=740&t=st=1674401008~exp=1674401608~hmac=52451c06781bbb523cbe80ee03804c35ca8641f1f4d2916dbe960c40195f2cd8" alt="placedimage" />Order Placed,Thank You</p>
        </div>
        <div>
          <span>Shipping to </span>
          <span> <b>{user.name}</b>:</span>
          <p>
            {shippingInfo.address}
          </p>
          <p>
            pincode:{shippingInfo.pincode}
          </p>
          <p>
            Phone Number:{shippingInfo.phoneNo}
          </p>
          
        </div>
        <div className="images">

          {cartItems &&cartItems.map((item)=>(
             <div>
             <img src={item.image} alt="product" />
             </div>
          ))}
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
    .images{
  display:flex;
  img{
    height:50px ;
    width:50px
  }
}
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
        margin:10px;
    }
}

`;
