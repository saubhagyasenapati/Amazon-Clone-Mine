import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import ProductDetails from "./components/ProductDetails";
import Products from "./components/Products";
import SignUp from "./components/subcomponents/SignUp";
import LogIn from "./components/subcomponents/LogIn";
import store from "./store"
import { loadUser } from "./actions/userActions";
import React from "react";
import { useSelector } from "react-redux";
import NavbarLogin from "./components/NavbarLogin";
import Profile from "./components/Profile";


function App() {
  const{isAuthenticated,user}=useSelector((state)=>state.user);
  React.useEffect(()=>{
    store.dispatch(loadUser())
  },[])
  
  return (
    <>
      <Router>
        {isAuthenticated&&<NavbarLogin user={user}/>}
        {!isAuthenticated&&<Navbar/>}
        <Routes>
          <Route exact path="/" element={<Home/>}></Route>
          <Route exact path="/product/:id" element={<ProductDetails/>}></Route>
          <Route exact path="/products" element={<Products/>}></Route>
          <Route exact path="/products/:keyword" element={<Products/>}></Route>
          <Route exact path="/Login" element={<LogIn/>}></Route>
          <Route exact path="/Register" element={<SignUp/>}></Route>
          <Route exact path="/account" element={<Profile/>}></Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
