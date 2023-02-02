// import React, { useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import styled from "styled-components";
// import e from "express";
// import { saveShippingInfo } from "../actions/cartActions";
// import { useNavigate } from "react-router-dom";
// const Shipping = () => {
//   const dispatch = useDispatch();

  
//   const [address, setaddress] = useState();
//   const [city, setcity] = useState();
//   const [state, setState] = useState();
//   const [country, setCountry] = useState();
//   const [pincode, setPincode] = useState();
//   const [phoneNo, setPhoneNo] = useState();
//  const navigate=useNavigate();
//   const shippingsubmit = () => {
//     e.preventDefault();
//     if(phoneNo.length<10||phoneNo.length>10){
//         console.log("Enter again");
//     }
//     dispatch(
//          saveShippingInfo({address})
//     );
//     navigate("/order/confirm")
//   };
//   return (
//     <Section>
//       <div className="shipingContainer">
//         <div className="shippingBox">
//           <h2>Shipping Details</h2>
//           <form
//             className="shippingForm"
//             encType="multipart/formdata"
//             onSubmit={shippingsubmit}
//           >
//             <div>
//               <span>Address </span>
//               <textarea
//                 placeholder="Address"
//                 required
//                 value={address}
//                 onChange={(e) => setaddress(e.target.value)}
//               />
//             </div>
//             <div>
//               <span>Pincode </span>
//               <input
//                 type="Number"
//                 placeholder="Pincode"
//                 required
//                 value={pincode}
//                 onChange={(e) => setPincode(e.target.value)}
//               />
//             </div>
//             <div>
//               <span>Phone Number </span>
//               <input
//                 type="Number"
//                 placeholder="Phone Number"
//                 required
//                 value={phoneNo}
//                 onChange={(e) => setPhoneNo(e.target.value)}
//                 size="10"
//               />
//             </div>
//             {/* <div>
//                 <select
//                 required
//                 value={country}
//                 onChange={(e)=>setCountry(e.target.value)}
//                 >
//                   <option value="">Country</option>
//                   {Country &&
//                   Country.getAllCountries().map((item)=>(
//                     <option key={item.isoCode} value={item.isoCode}>{item.name}</option>
//                   ))}
//                 </select>
//             </div>
//             {country &&(
//                   <div>
//                   <select
//                   required
//                   value={state}
//                   onChange={(e)=>setState(e.target.value)}
//                   >
//                     <option value="">State</option>
//                     {State &&
//                     State.getStatesOfCountry(country).map((item)=>(
//                       <option key={item.isoCode} value={item.isoCode}>{item.name}</option>
//                     ))}
//                   </select>
//               </div>
//             )}
//              {state &&(
//                   <div>
//                   <select
//                   required
//                   value={city}
//                   onChange={(e)=>setcity(e.target.value)}
//                   >
//                     <option value="">City</option>
//                     {City &&
//                     City.getCitiesOfState(country,state).map((item)=>(
//                       <option key={item.isoCode} value={item.isoCode}>{item.name}</option>
//                     ))}
//                   </select>
//               </div>
//             )} */}
//            <button disabled={city?false:true}>Submit</button>
//           </form>
//         </div>
//       </div>
//     </Section>
//   );
// };
import React, { useState} from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components'
import { saveShippingInfo } from '../actions/cartActions';
const Shipping = () => {
  const dispatch=useDispatch();
  const [address, setaddress] = useState();
  const [pincode, setpincode] = useState();
  const [phoneNo, setphoneno] = useState();
  const navigate=useNavigate();

  const handleSubmit=(e)=>{
        e.preventDefault();
      
        dispatch(
             saveShippingInfo({address,pincode,phoneNo})
        );
        navigate("/order/payment")
      };

 
  
  
  return (
    <Section>
           <div>
              <h5>Address</h5>
               <textarea type="text" className="form-control" name="address" placeholder="1234 Main St"   onChange={(e)=>setaddress(e.target.value)}/>
              </div>
              <div>
              <h5>Pincode</h5>
               <input type="text" className="form-control" name="pincode" placeholder="pincode"   onChange={(e)=>setpincode(e.target.value)}/>
              </div>
              <div>
              <h5>Phone Number</h5>
               <input type="number" className="form-control" name="phoneno" placeholder="Phone No."  onChange={(e)=>setphoneno(e.target.value)}/>
              </div>
              <div>
                <button className='shipbtn'  onClick={handleSubmit} >Submit</button>
              </div>
    </Section>
  )
}



export default Shipping;

const Section = styled.section`
display:grid ;
justify-content:center ;
align-items:center ;
margin:2rem ;
.shipbtn{
  margin: 15px auto;
    display: grid;
    width: 100%;
    background-color: #ff9900;
    border: 1px solid;
    border-radius: 0.3rem;
    border-color: #a88734 #9c7e31 #846a29;
}
`;


