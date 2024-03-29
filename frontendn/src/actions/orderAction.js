import {
  ALL_ORDER_FAIL,
  ALL_ORDER_REQUEST,
  ALL_ORDER_SUCCESS,
  CLEAR_ERRORS,
  CREATE_ORDER_FAIL,
  CREATE_ORDER_REQUEST,
  CREATE_ORDER_SUCCESS,
  DELETE_ORDER_FAIL,
  DELETE_ORDER_REQUEST,
  DELETE_ORDER_SUCCESS,
  MY_ORDER_FAIL,
  MY_ORDER_REQUEST,
  MY_ORDER_SUCCESS,
  ORDER_DETAILS_FAIL,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
  UPDATE_ORDER_FAIL,
  UPDATE_ORDER_REQUEST,
  UPDATE_ORDER_SUCCESS,
} from "../constants/orderConstant";

import axios from "axios";
import { API } from "../APIroutes";

//Create Order Request
export const createOrder = (order) => async (dispatch) => {
  try {
    dispatch({ type: CREATE_ORDER_REQUEST });
    const config = { headers: { "Content-type": "application/json","auth-token":localStorage.getItem('token') } };
  
    const { data } = await axios.post(`${API}/api/v1/order/new`, order, config);

    dispatch({ type: CREATE_ORDER_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: CREATE_ORDER_FAIL,
      payload: error.response.data.message,
    });
  }
};

//MY orders request
export const myOrder = () => async (dispatch) => {
  try {
    dispatch({ type: MY_ORDER_REQUEST });
    const config = { headers: { "auth-token":localStorage.getItem('token') } };
    console.log(localStorage.getItem('token'))
    const { data } = await axios.get(`${API}/api/v1/orders/me`,config);

    dispatch({ type: MY_ORDER_SUCCESS, payload: data.orders });
  } catch (error) {
    dispatch({
      type: MY_ORDER_FAIL,
      payload: error.response.data.message,
    });
  }
};
//Get Order Details
export const getOrder = (id) => async (dispatch) => {
  try {
    dispatch({ type: ORDER_DETAILS_REQUEST });
    const config = { headers: {"auth-token":localStorage.getItem('token') } };
    const { data } = await axios.get(`${API}/api/v1/order/${id}`,config);
     
    dispatch({ type: ORDER_DETAILS_SUCCESS, payload: data.order });
  } catch (error) {
    dispatch({
      type: ORDER_DETAILS_FAIL,
      payload: error.response.data.message,
    });
  }
};

//Get All orders(admin)
export const getAllOrder = () => async (dispatch) => {
  try {
    dispatch({ type: ALL_ORDER_REQUEST });
    const config = { headers: { "auth-token":localStorage.getItem('token') } };
    const { data } = await axios.get(`${API}/api/v1/admin/orders`,config);

    dispatch({ type: ALL_ORDER_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: ALL_ORDER_FAIL,
      payload: error.response.data.message,
    });
  }
};

//Update Order--admin
export const updateOrder = (id, order) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_ORDER_REQUEST });
    const config = { headers: { "Content-type": "application/json","auth-token":localStorage.getItem('token') } };
    const { data } = await axios.put(
      `${API}/api/v1/admin/order/${id}`,
      order,
      config
    );

    dispatch({ type: UPDATE_ORDER_SUCCESS, payload: data.success });
  } catch (error) {
    dispatch({
      type: UPDATE_ORDER_FAIL,
      payload: error.response.data.message,
    });
  }
};
//delete Order--admin
export const deleteOrder = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_ORDER_REQUEST });
    const config = { headers: { "auth-token":localStorage.getItem('token') } };
    const { data } = await axios.delete(`${API}/api/v1/admin/order/${id}`,config);

    dispatch({ type: DELETE_ORDER_SUCCESS, payload: data.success });
  } catch (error) {
    dispatch({
      type: DELETE_ORDER_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};
