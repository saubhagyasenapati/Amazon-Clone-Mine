import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import ProductDetails from "./components/ProductDetails";
import Products from "./components/Products";
function App() {
  return (
    <>
      <Router>
        <Navbar/>
        <Routes>
          <Route exact path="/" element={<Home/>}></Route>
          <Route exact path="/products/:id" element={<ProductDetails/>}></Route>
          <Route exact path="/products" element={<Products/>}></Route>
          {/* <Route
            exact
            path="/home"
            element={<Home showAlert={showAlert} />}
          ></Route>
          <Route exact path="/about" element={<About />}></Route>
          <Route
            exact
            path="/login"
            element={<Login showAlert={showAlert} />}
          ></Route>
          <Route
            exact
            path="/signup"
            element={<SignUp showAlert={showAlert} />}
          ></Route> */}
        </Routes>
      </Router>
    </>
  );
}

export default App;
