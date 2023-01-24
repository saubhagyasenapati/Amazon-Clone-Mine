import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import {Country,State,City} from "country-state-city"
import e from "express";
import { saveShippingInfo } from "../actions/cartActions";
import { useNavigate } from "react-router-dom";
const Shipping = () => {
  const dispatch = useDispatch();

  const { shippingInfo } = useSelector((state) => state.cart);
  const [address, setaddress] = useState(shippingInfo.address);
  const [city, setcity] = useState(shippingInfo.city);
  const [state, setState] = useState(shippingInfo.state);
  const [country, setCountry] = useState(shippingInfo.country);
  const [pincode, setPincode] = useState(shippingInfo.pinCode);
  const [phoneNo, setPhoneNo] = useState(shippingInfo.phoneNo);
 const navigate=useNavigate();
  const shippingsubmit = () => {
    e.preventDefault();
    if(phoneNo.length<10||phoneNo.length>10){
        console.log("Enter again");
    }
    dispatch(
         saveShippingInfo({address,city,state,country,pincode,phoneNo})
    );
    navigate("/order/confirm")
  };
  return (
    <Section>
      <div className="shipingContainer">
        <div className="shippingBox">
          <h2>Shipping Details</h2>
          <form
            className="shippingForm"
            encType="multipart/formdata"
            onSubmit={shippingsubmit}
          >
            <div>
              <span>Address </span>
              <input
                type="text"
                placeholder="Address"
                required
                value={address}
                onChange={(e) => setaddress(e.target.value)}
              />
            </div>
            <div>
              <span>Pincode </span>
              <input
                type="Number"
                placeholder="Pincode"
                required
                value={pincode}
                onChange={(e) => setPincode(e.target.value)}
              />
            </div>
            <div>
              <span>Phone Number </span>
              <input
                type="Number"
                placeholder="Phone Number"
                required
                value={phoneNo}
                onChange={(e) => setPhoneNo(e.target.value)}
                size="10"
              />
            </div>
            <div>
                <select
                required
                value={country}
                onChange={(e)=>setCountry(e.target.value)}
                >
                  <option value="">Country</option>
                  {Country &&
                  Country.getAllCountries().map((item)=>(
                    <option key={item.isoCode} value={item.isoCode}>{item.name}</option>
                  ))}
                </select>
            </div>
            {country &&(
                  <div>
                  <select
                  required
                  value={state}
                  onChange={(e)=>setState(e.target.value)}
                  >
                    <option value="">State</option>
                    {State &&
                    State.getStatesOfCountry(country).map((item)=>(
                      <option key={item.isoCode} value={item.isoCode}>{item.name}</option>
                    ))}
                  </select>
              </div>
            )}
             {state &&(
                  <div>
                  <select
                  required
                  value={city}
                  onChange={(e)=>setcity(e.target.value)}
                  >
                    <option value="">City</option>
                    {City &&
                    City.getCitiesOfState(country,state).map((item)=>(
                      <option key={item.isoCode} value={item.isoCode}>{item.name}</option>
                    ))}
                  </select>
              </div>
            )}
           <button disabled={city?false:true}>Submit</button>
          </form>
        </div>
      </div>
    </Section>
  );
};

export default Shipping;

const Section = styled.section`
display:flex ;
justify-content:center ;
align-items:center ;
margin:2rem ;
`;
