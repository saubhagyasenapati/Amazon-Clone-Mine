import axios from "axios";
import { API } from "../APIroutes";

import {
  ADMIN_PRODUCT_FAIL,
  ADMIN_PRODUCT_REQUEST,
  ADMIN_PRODUCT_SUCCESS,
  ALL_PRODUCT_FAIL,
  ALL_PRODUCT_REQUEST,
  ALL_PRODUCT_SUCCESS,
  ALL_REVIEWS_FAIL,
  ALL_REVIEWS_REQUEST,
  ALL_REVIEWS_SUCCESS,
  CLEAR_ERRORS,
  DELETE_PRODUCT_FAIL,
  DELETE_PRODUCT_REQUEST,
  DELETE_PRODUCT_SUCCESS,
  DELETE_REVIEWS_FAIL,
  DELETE_REVIEWS_REQUEST,
  DELETE_REVIEWS_SUCCESS,
  NEW_PRODUCT_FAIL,
  NEW_PRODUCT_REQUEST,
  NEW_PRODUCT_SUCCESS,
  PRODUCT_DETAILS_FAIL,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  REVIEW_ADD_FAIL,
  REVIEW_ADD_REQUEST,
  REVIEW_ADD_SUCCESS,
  UPDATE_PRODUCT_FAIL,
  UPDATE_PRODUCT_REQUEST,
  UPDATE_PRODUCT_SUCCESS,
} from "../components/productConstants";

//Get All Pdroducts Filtered
export const getProduct =
  (keyword = "", currentPage = 1, price, category, rating) =>
  async (dispatch) => {
    try {
      dispatch({
        type: ALL_PRODUCT_REQUEST,
      });
      let link = `${API}/api/v1/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&rating[gte]=${rating[0]}&rating[lte]=${rating[1]}`;
      if (category) {
        link = `${API}/api/v1/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&rating[gte]=${rating[0]}&rating[lte]=${rating[1]}&category=${category}`;
      }

      const { data } = await axios.get(link);
      dispatch({
        type: ALL_PRODUCT_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: ALL_PRODUCT_FAIL,
        payload: error.response.data.message,
      });
    }
  };
//GET ALL PRODUCTS ADMIN
export const getProductAdmin = () => async (dispatch) => {
  try {
    dispatch({ type: ADMIN_PRODUCT_REQUEST });
    const { data } = await axios.get(`${API}/api/v1/admin/products`);
    dispatch({ type: ADMIN_PRODUCT_SUCCESS, payload: data.products });
  } catch (error) {
    dispatch({
      type: ADMIN_PRODUCT_FAIL,
      payload: error.response.data.message,
    });
  }
};

//Get All Products Details
export const getProductDetails = (id) => async (dispatch) => {
  try {
    dispatch({
      type: PRODUCT_DETAILS_REQUEST,
    });
    const { data } = await axios.get(`${API}/api/v1/products/${id}`);
    dispatch({
      type: PRODUCT_DETAILS_SUCCESS,
      payload: data.product,
    });
  } catch (error) {
    dispatch({
      type: PRODUCT_DETAILS_FAIL,
      payload: error.response.data.message,
    });
  }
};

//Create A New Product
export const createProduct = (productData) => async (dispatch) => {
  try {
    dispatch({
      type: NEW_PRODUCT_REQUEST,
    });
    const config = { headers: { "Content-type": "application/json" } };
    const { data } = await axios.post(
      `${API}/api/v1/admin/products/new`,
      productData,
      config
    );
    dispatch({
      type: NEW_PRODUCT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: NEW_PRODUCT_FAIL,
      payload: error.response.data.message,
    });
  }
};

//Add a review
export const newReviewadd = (review) => async (dispatch) => {
  try {
    dispatch({
      type: REVIEW_ADD_REQUEST,
    });
    const config = { headers: { "Content-type": "application/json" } };
    const { data } = await axios.put(`${API}/api/v1/review`, review, config);
    dispatch({
      type: REVIEW_ADD_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: REVIEW_ADD_FAIL,
      payload: error.response.data.message,
    });
  }
};

//Delete Product
export const deleteProduct = (id) => async (dispatch) => {
  try {
    dispatch({
      type: DELETE_PRODUCT_REQUEST,
    });

    const { data } = await axios.delete(`${API}/api/v1/admin/products/${id}`);
    dispatch({
      type: DELETE_PRODUCT_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: DELETE_PRODUCT_FAIL,
      payload: error.response.data.message,
    });
  }
};

//Update Product
export const updateProduct = (id, productData) => async (dispatch) => {
  try {
    dispatch({
      type: UPDATE_PRODUCT_REQUEST,
    });
    const config = { headers: { "Content-type": "application/json" } };
    const { data } = await axios.put(
      `${API}/api/v1/admin/products/${id}`,
      productData,
      config
    );
    dispatch({
      type: UPDATE_PRODUCT_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_PRODUCT_FAIL,
      payload: error.response.data.message,
    });
  }
};

//Get all review of a product
export const newReviews = (id) => async (dispatch) => {
  try {
    dispatch({
      type: ALL_REVIEWS_REQUEST,
    });

    const { data } = await axios.get(`${API}/api/v1/reviews?id=${id}`);
    dispatch({
      type: ALL_REVIEWS_SUCCESS,
      payload: data.reviews,
    });
  } catch (error) {
    dispatch({
      type: ALL_REVIEWS_FAIL,
      payload: error.response.data.message,
    });
  }
};

//Delete Review of a product
export const deleteReview = (reviewId, productId) => async (dispatch) => {
  try {
    dispatch({
      type: DELETE_REVIEWS_REQUEST,
    });

    const { data } = await axios.delete(
      `${API}/api/v1/reviews?id=${reviewId}&&productId=${productId}`
    );
    dispatch({
      type: DELETE_REVIEWS_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: DELETE_REVIEWS_FAIL,
      payload: error.response.data.message,
    });
  }
};

//Clearing Errors
export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};
