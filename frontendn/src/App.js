import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import ProductDetails from "./components/ProductDetails";
import Products from "./components/Products";
import SignUp from "./components/subcomponents/SignUp";
import LogIn from "./components/subcomponents/LogIn";
import store from "./store";
import { loadUser } from "./actions/userActions";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import NavbarLogin from "./components/NavbarLogin";
import Profile from "./components/Profile";
import UpdateProfile from "./components/UpdateProfile";
import UpdatePassword from "./components/UpdatePassword";
import Forgotpassword from "./components/Forgotpassword";
import ResetPassword from "./components/ResetPassword";
import Cart from "./components/Cart";
import Orderfinal from "./components/Orderfinal";
import Shipping from "./components/Shipping";
import PaymentOverview from "./components/PaymentOverview";
import axios from "axios";
import Payment from "./components/Payment";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import Myorders from "./components/Myorders";
import OrderDetails from "./components/OrderDetails";
function App() {
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const [stripeApiKey, setstripeApiKey] = useState(null);
  async function getStripeApiKey() {
    const { data } = await axios.get("/api/v1/stripeapikey");
    setstripeApiKey(data.stripeApiKey);
  
  }
  
  useEffect(() => {
    store.dispatch(loadUser());
    getStripeApiKey();
  }, []);

  return (
    <>
      <Router>
        {isAuthenticated && <NavbarLogin user={user} />}
        {!isAuthenticated && <Navbar />}
        <Routes>
          <Route exact path="/" element={<Home />}></Route>
          <Route exact path="/product/:id" element={<ProductDetails />}></Route>
          <Route exact path="/products" element={<Products />}></Route>
          <Route exact path="/products/:keyword" element={<Products />}></Route>
          <Route exact path="/Login" element={<LogIn />}></Route>
          <Route exact path="/Register" element={<SignUp />}></Route>
          {isAuthenticated && (
            <Route exact path="/account" element={<Profile />}></Route>
          )}
          {isAuthenticated && (
            <Route
              exact
              path="/updateProfile"
              element={<UpdateProfile />}
            ></Route>
          )}
          {isAuthenticated && (
            <Route
              exact
              path="/password/update"
              element={<UpdatePassword />}
            ></Route>
          )}
          {isAuthenticated && (
            <Route
              exact
              path="/password/forgot"
              element={<Forgotpassword />}
            ></Route>
          )}
          {isAuthenticated && (
            <Route
              exact
              path="/password/reset/:token"
              element={<ResetPassword />}
            ></Route>
          )}

          <Route exact path="/cart" element={<Cart />}></Route>
          {isAuthenticated && (
            <Route exact path="/order/address" element={<Shipping />}></Route>
          )}
          {isAuthenticated && (
            <Route exact path="/order/placed" element={<Orderfinal />}></Route>
          )}
          {isAuthenticated && (
            <Route
              exact
              path="/order/payment"
              element={<PaymentOverview />}
            ></Route>
          )}
            {isAuthenticated && (
            <Route
              exact
              path="/myorders"
              element={<Myorders />}
            ></Route>
          )}
            <Route
              exact
              path="/order/:id"
              element={<OrderDetails />}
            ></Route>
              <Route exact path="/order/paymentstripe" element={<Elements stripe={loadStripe(stripeApiKey)}><Payment/></Elements>}></Route>
    

        </Routes>
      </Router>
    </>
  );
}

export default App;
