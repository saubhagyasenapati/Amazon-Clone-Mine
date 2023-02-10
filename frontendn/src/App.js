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
import Dashboard from "./components/admin components/Dashboard";
import ProductList from "./components/admin components/ProductList";
import NewProduct from "./components/admin components/NewProduct";
import UpdateProduct from "./components/admin components/UpdateProduct";
import OrderList from "./components/admin components/OrderList";
import UpdateOrder from "./components/admin components/UpdateOrder";
import UsersList from "./components/admin components/UsersList";
import UpdateUser from "./components/admin components/UpdateUser";
import ProductReviews from "./components/admin components/ProductReviews";
import ProtectedRoute from "./components/ProtectedRoute";
import NotFound from "./components/subcomponents/NotFound";
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
          <Route path ="*" element={<NotFound/>}/>
          <Route exact path="/" element={<Home />}></Route>
          <Route exact path="/product/:id" element={<ProductDetails />}></Route>
          <Route exact path="/products" element={<Products />}></Route>
          <Route exact path="/products/:keyword" element={<Products />}></Route>
          <Route exact path="/Login" element={<LogIn />}></Route>
          <Route exact path="/Register" element={<SignUp />}></Route>

          <Route exact path="/account" element={<Profile />}></Route>

          <Route
            exact
            path="/updateProfile"
            element={
              <ProtectedRoute>
                <UpdateProfile />
              </ProtectedRoute>
            }
          ></Route>

          <Route
            exact
            path="/password/update"
            element={
              <ProtectedRoute>
                <UpdatePassword />
              </ProtectedRoute>
            }
          ></Route>

          <Route
            exact
            path="/password/forgot"
            element={<Forgotpassword />}
          ></Route>

          <Route
            exact
            path="/password/reset/:token"
            element={<ResetPassword />}
          ></Route>

          <Route exact path="/cart" element={<Cart />}></Route>

          <Route
            exact
            path="/order/address"
            element={
              <ProtectedRoute>
                <Shipping />
              </ProtectedRoute>
            }
          ></Route>

          <Route
            exact
            path="/order/placed"
            element={
              <ProtectedRoute>
                <Orderfinal />
              </ProtectedRoute>
            }
          ></Route>

          <Route
            exact
            path="/order/payment"
            element={
              <ProtectedRoute>
                <PaymentOverview />
              </ProtectedRoute>
            }
          ></Route>

          <Route
            exact
            path="/myorders"
            element={
              <ProtectedRoute>
                <Myorders />
              </ProtectedRoute>
            }
          ></Route>

          <Route exact path="/order/:id" element={<OrderDetails />}></Route>
          <Route
            exact
            path="/order/paymentstripe"
            element={
              <ProtectedRoute>
                {" "}
                <Elements stripe={loadStripe(stripeApiKey)}>
                  <Payment />
                </Elements>
              </ProtectedRoute>
            }
          ></Route>

          <Route
            path="/admin/dashboard"
            element={
              <ProtectedRoute isAdmin={true}>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          <Route
            exact
            path="/admin/products"
            element={
              <ProtectedRoute isAdmin={true}>
                <ProductList />
              </ProtectedRoute>
            }
          ></Route>
          <Route
            exact
            path="/admin/product"
            element={
              <ProtectedRoute isAdmin={true}>
                <NewProduct />
              </ProtectedRoute>
            }
          ></Route>
          <Route
            exact
            path="/admin/product/:id"
            element={
              <ProtectedRoute isAdmin={true}>
                <UpdateProduct />
              </ProtectedRoute>
            }
          ></Route>
          <Route
            exact
            path="/admin/orders"
            element={
              <ProtectedRoute isAdmin={true}>
                {" "}
                <OrderList />
              </ProtectedRoute>
            }
          ></Route>
          <Route
            exact
            path="/admin/order/:id"
            element={
              <ProtectedRoute isAdmin={true}>
                <UpdateOrder />
              </ProtectedRoute>
            }
          ></Route>
          <Route
            exact
            path="/admin/users"
            element={
              <ProtectedRoute isAdmin={true}>
                <UsersList />
              </ProtectedRoute>
            }
          ></Route>
          <Route
            exact
            path="/admin/user/:id"
            element={
              <ProtectedRoute isAdmin={true}>
                <UpdateUser />
              </ProtectedRoute>
            }
          ></Route>
          <Route
            exact
            path="/admin/reviews/:id"
            element={
              <ProtectedRoute isAdmin={true}>
                <ProductReviews />
              </ProtectedRoute>
            }
          ></Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
