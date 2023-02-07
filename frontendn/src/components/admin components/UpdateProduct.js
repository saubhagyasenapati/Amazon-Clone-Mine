import React,{useState,useEffect} from "react";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import DescriptionIcon from "@mui/icons-material/Description";
import StorageIcon from "@mui/icons-material/Storage";
import SpellcheckIcon from "@mui/icons-material/Spellcheck";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { UPDATE_PRODUCT_RESET } from "../productConstants";
import { clearErrors, getProductDetails, updateProduct } from "../../actions/productAction";
import Sideboard from "./Sideboard";

const UpdateProduct = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {id}=useParams();
  const {error,products } = useSelector((state) => state.productDetails);
  const { loading, error:updateError, isUpdated } = useSelector((state) => state.product);
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [stock, setStock] = useState(0);
  const [oldimages, setOldImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);
  const [images, setImages] = useState([]);
  const categories = [
    "Mobile,Computer",
    "TV,Appliance,Electronics",
    "Fashion",
    "Home,Kitchen,Pets",
    "Beauty,Health,Grocery",
    "Books",
  ];


  const updateProductSubmitHandler=(e)=>{
    e.preventDefault();
    const myform=new FormData();

    myform.set("name",name);
    myform.set("price",price);
    myform.set("description",description);
    myform.set("category",category);
    myform.set("Stock",stock);
   
    // images.forEach((image)=>{
    //     myform.append("images",image);
    // });
    dispatch(updateProduct(id,myform));

  }

//   const updateProductImagesChange=(e)=>{
//     const files=Array.from(e.target.files);

//     setOldImages([]);
//     setImages([]);
//     setImagesPreview([]);

//     files.forEach((file)=>{
//      const reader=new FileReader();
//      reader.onload=()=>{
//         if(reader.readyState===2){
//             setImagesPreview((old)=>[...old,reader.result]);
//             setOldImages((old)=>[...old,reader.result]);
//         }
//      };
//      reader.readAsDataURL(file);
//     })
//   };
  useEffect(() => {
    if(products&&products._id!==id){
        dispatch(getProductDetails(id))
    }
    else{
       setName(products.name);
       setDescription(products.description);
       setPrice(products.price);
       setCategory(products.category);
       setStock(products.Stock);
       setOldImages(products.images)
    }
    if (updateError) {
        toast(updateError, {
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
    if (isUpdated) {
        toast("Updated Successfully", {
            position: "bottom-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          });
      navigate("/admin/products");
      dispatch({ type: UPDATE_PRODUCT_RESET });
    }
  }, [dispatch, error,isUpdated,products,id]);

  return (
    <Section>
      <div className="dashboard">
        <Sideboard />
        <div className="newProductContainer">
          <form className="createProductForm" encType="mutipart/form-data">
            <h1>Update Product</h1>
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
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
            <div>
              <DescriptionIcon />
              <textarea
                placeholder="Product Description"
                onChange={(e) => setDescription(e.target.value)}
                value={description}
              />
            </div>
            <div>
              <AccountTreeIcon />
              <select  onChange={(e) => setCategory(e.target.value)} value={category}>
                <option value="" >Choose Category</option>
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
                value={stock}
                onChange={(e) => setStock(e.target.value)}
              />
            </div>
            {/* <div className="createProductFormImage">
              {oldimages&&oldimages.map((image, index) => (
                <img key={index} src={image.url} alt="Preview" />
              ))}
            </div>
            <div className="createProductFormFile">
              <input type="file" name="images" accept="image/*" multiple  onChange={updateProductImagesChange}/>
            </div>
          
            <div className="createProductFormImage">
              {imagesPreview.map((image, index) => (
                <img key={index} src={image} alt="Preview" />
              ))}
            </div> */}
            <button
              id="createProductBtn"
              type="submit"
              onClick={updateProductSubmitHandler}
              disabled={loading ? true : false}
              
            >
              Update Product
            </button>
          </form>
        </div>
      </div>
      <ToastContainer/>
    </Section>
  );
};

export default UpdateProduct;

const Section = styled.section`

.newProductContainer{
    display:flex ;
align-items:center ;
justify-content:center ;
.createProductForm{
    .createProductFormImage{
        width:100% ;
        overflow:auto ;
        img{
        border-radius:100% ;
        height:250px ;
        width:250px;
    }
    }

}

}
.dashboard {
  width: 100vw;
  max-width: 100%;
  display: grid;
  grid-template-columns: 1fr 5fr;
  
} 

`