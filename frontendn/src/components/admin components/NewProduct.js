import React, { useState, useEffect } from "react";
import Sideboard from "./Sideboard";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import DescriptionIcon from "@mui/icons-material/Description";
import StorageIcon from "@mui/icons-material/Storage";
import SpellcheckIcon from "@mui/icons-material/Spellcheck";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, createProduct } from "../../actions/productAction";
import { useNavigate } from "react-router-dom";
import { NEW_PRODUCT_RESET } from "../productConstants";
import styled from "styled-components";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const NewProduct = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, success } = useSelector((state) => state.newProduct);
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [stock, setStock] = useState(0);
  const [images, setImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);
  const categories = [
    "Mobile,Computer",
    "TV,Appliance,Electronics",
    "Fashion",
    "Home,Kitchen,Pets",
    "Beauty,Health,Grocery",
    "Books",
  ];

  useEffect(() => {
    if (error) {
      toast(error, {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      dispatch(clearErrors());
    }
    if (success) {
      toast("Product Created Successfully", {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      navigate("/admin/dashboard");
      dispatch({ type: NEW_PRODUCT_RESET });
    }
  }, [dispatch, error, success]);

  const createProductSubmitHandler = (e) => {
    e.preventDefault();
    const myform = new FormData();

    myform.set("name", name);
    myform.set("price", price);
    myform.set("description", description);
    myform.set("category", category);
    myform.set("Stock", stock);

    images.forEach((image) => {
      myform.append("images", image);
    });
    dispatch(createProduct(myform));
  };

  const createProductImagesChange = (e) => {
    const files = Array.from(e.target.files);

    setImages([]);
    setImagesPreview([]);

    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setImagesPreview((old) => [...old, reader.result]);
          setImages((old) => [...old, reader.result]);
        }
      };
      reader.readAsDataURL(file);
    });
  };
  return (
    <Section>
      <div className="dashboard">
        <Sideboard />
        <div className="newProductContainer">
          <form className="createProductForm" encType="mutipart/form-data">
            <h1>Create Product</h1>
            <div>
              <SpellcheckIcon />
              <input
                type="text"
                placeholder="Product Name"
                value={name}
                required
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              <AttachMoneyIcon />
              <input
                type="number"
                placeholder="Price"
                required
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
            <div>
              <DescriptionIcon />
              <textarea
                placeholder="Product Description"
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div>
              <AccountTreeIcon />
              <select onChange={(e) => setCategory(e.target.value)}>
                <option value="">Choose Category</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <StorageIcon />
              <input
                type="number"
                placeholder="Stock"
                required
                onChange={(e) => setStock(e.target.value)}
              />
            </div>
            <div className="createProductFormFile">
              <input
                type="file"
                name="images"
                accept="image/*"
                multiple
                onChange={createProductImagesChange}
              />
            </div>
            <div className="createProductFormImage">
              {imagesPreview.map((image, index) => (
                <img key={index} src={image} alt="Preview" />
              ))}
            </div>
            <button
              id="createProductBtn"
              type="submit"
              onClick={createProductSubmitHandler}
              disabled={loading ? true : false}
            >
              Create Product
            </button>
          </form>
        </div>
      </div>
      <ToastContainer />
    </Section>
  );
};

export default NewProduct;

const Section = styled.section`
  .newProductContainer {
    display: flex;
    align-items: center;
    justify-content: center;
    .createProductForm {
      .createProductFormImage {
        width: 100%;
        overflow: auto;
        img {
          border-radius: 100%;
          height: 250px;
          width: 250px;
        }
      }
      button {
        margin: 15px auto;
        display: grid;
        width: 100%;
        background-color: #ff9900;
        border: 1px solid;
        border-radius: 0.3rem;
        border-color: #a88734 #9c7e31 #846a29;
      }
    }
  }
  .dashboard {
    width: 100vw;
    max-width: 100%;
    display: grid;
    grid-template-columns: 1fr 5fr;
  }
`;
