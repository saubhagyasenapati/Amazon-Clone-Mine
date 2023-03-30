import React, { useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  useStripe,
  useElements,
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
} from "@stripe/react-stripe-js";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import EventIcon from "@mui/icons-material/Event";
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import styled from "styled-components";
import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { clearErrors, createOrder } from "../actions/orderAction";
import { RESET_CART } from "../constants/cartConstant";
import { API } from "../APIroutes";
import {PaymentElement} from '@stripe/react-stripe-js';
const Payment = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const stripe = useStripe();
  const elements = useElements();
  const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"));
  const payBtn = useRef(null);
  const { shippingInfo, cartItems } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.user);
  const { error } = useSelector((state) => state.newOrder);
  const paymentData = {
    amount: Math.round(orderInfo.totalPrice * 100),
  };
  const order = {
    shippingInfo,
    orderItems: cartItems,
    itemsPrice: orderInfo.subtotal,
    taxPrice: orderInfo.tax,
    shippingPrice: orderInfo.shippingCharges,
    totalPrice: orderInfo.totalPrice,
  };
  const submitHandler = async (e) => {
    e.preventDefault();
    payBtn.current.disabled = true;
    try {
      // const config = { headers: { "Content-type": "application/json","auth-token":localStorage.getItem("token") } };
      // const { data } = await axios.post(
      //   `${API}/api/v1/payment/process`,
      //   paymentData,
      //   config
      // );

      // const client_secret = data.client_secret;

    //   if (!stripe || !elements) return;
    //   const result = await stripe.confirmCardPayment(client_secret, {
    //     payment_method: {
    //       card: elements.getElement(CardNumberElement),
    //       billing_details: {
    //         name: user.name,
    //         email: user.email,
    //         address: {
    //           line1: shippingInfo.address,
    //           postal_code: shippingInfo.pincode,
    //         },
    //       },
    //     },
    //   });

    //   if (result.error) {
    //     payBtn.current.disabled = false;
    //   } else {
    //     if (result.paymentIntent.status === "succeeded") {
    //       order.paymentInfo = {
    //         id: result.paymentIntent.id,
    //         status: result.paymentIntent.status,
    //       };
    //       dispatch(createOrder(order));
    //       localStorage.removeItem("cartItems");
    //       dispatch({ type: RESET_CART });
    //       navigate("/order/placed");
    //     } else {
    //       toast("There was some error proccessing the payment", {
    //         position: "bottom-center",
    //         autoClose: 5000,
    //         hideProgressBar: false,
    //         closeOnClick: true,
    //         pauseOnHover: true,
    //         draggable: true,
    //         progress: undefined,
    //         theme: "dark",
    //       });
    //     }
    //   }
    // } catch (error) {
    //   payBtn.current.disabled = false;
    // }
      order.paymentInfo = {
              id:7788867 ,
              status: "succeeded",
            };
            dispatch(createOrder(order));
            localStorage.removeItem("cartItems");
            dispatch({ type: RESET_CART });
            navigate("/order/placed");
  }
  catch{
     payBtn.current.disabled = false;
  };
}
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
      dispatchEvent(clearErrors);
    }
  }, [dispatch]);

  return (
    <Section>
      
      <div className="paymentConatiner">
        <h1>Payments</h1>
        <form className="paymentForm" onSubmit={(e) => submitHandler(e)}>
          <div>
            <CreditCardIcon />
            <CardNumberElement className="paymentInput" />
          </div>
          <div>
            <EventIcon />
            <CardExpiryElement className="paymentInput" />
          </div>
          <div>
            <VpnKeyIcon />
            <CardCvcElement className="paymentInput" />
          </div>
          <input
            type="submit"
            value={`Pay-${orderInfo.totalPrice}`}
            ref={payBtn}
            className="paymentBtn"
          />
        </form>
        <p>
          <i>
            You can use <b>4242 4242 4242 4242</b> as your card number for
            Testing Purpose
          </i>
        </p>
      </div>
  
      <ToastContainer />
    </Section>
  );
};

export default Payment;

const Section = styled.section`
  margin-top: 40px;
  .paymentConatiner {
    display: grid;
    place-items: center;
  }

  .paymentBtn {
    margin: 15px auto;
    display: grid;
    width: 100%;
    background-color: #ff9900;
    border: 1px solid;
    border-radius: 0.3rem;
    border-color: #a88734 #9c7e31 #846a29;
  }
`;

// import React, { useEffect } from "react";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import {
//   useStripe,
//   useElements,
//   CardNumberElement,
//   CardExpiryElement,
//   CardCvcElement,
// } from "@stripe/react-stripe-js";
// import CreditCardIcon from "@mui/icons-material/CreditCard";
// import EventIcon from "@mui/icons-material/Event";
// import VpnKeyIcon from "@mui/icons-material/VpnKey";
// import styled from "styled-components";
// import { useRef } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import { clearErrors, createOrder } from "../actions/orderAction";
// import { RESET_CART } from "../constants/cartConstant";
// import { API } from "../APIroutes";
// import {PaymentElement} from '@stripe/react-stripe-js';
// const Payment = () => {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const stripe = useStripe();
//   const elements = useElements();
//   const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"));
//   const payBtn = useRef(null);
//   const { shippingInfo, cartItems } = useSelector((state) => state.cart);
//   const { user } = useSelector((state) => state.user);
//   const { error } = useSelector((state) => state.newOrder);
//   const paymentData = {
//     amount: Math.round(orderInfo.totalPrice * 100),
//   };
//   const order = {
//     shippingInfo,
//     orderItems: cartItems,
//     itemsPrice: orderInfo.subtotal,
//     taxPrice: orderInfo.tax,
//     shippingPrice: orderInfo.shippingCharges,
//     totalPrice: orderInfo.totalPrice,
//   };
//   const submitHandler = async (e) => {
//     e.preventDefault();
//     payBtn.current.disabled = true;
//     try {
//       const config = { headers: { "Content-type": "application/json","auth-token":localStorage.getItem("token") } };
//       const { data } = await axios.post(
//         `${API}/api/v1/payment/process`,
//         paymentData,
//         config
//       );

//       const client_secret = data.client_secret;

//       if (!stripe || !elements) return;
//       const result = await stripe.confirmCardPayment(client_secret, {
//         payment_method: {
//           card: elements.getElement(CardNumberElement),
//           billing_details: {
//             name: user.name,
//             email: user.email,
//             address: {
//               line1: shippingInfo.address,
//               postal_code: shippingInfo.pincode,
//             },
//           },
//         },
//       });

//       if (result.error) {
//         payBtn.current.disabled = false;
//       } else {
//         if (result.paymentIntent.status === "succeeded") {
//           order.paymentInfo = {
//             id: result.paymentIntent.id,
//             status: result.paymentIntent.status,
//           };
//           dispatch(createOrder(order));
//           localStorage.removeItem("cartItems");
//           dispatch({ type: RESET_CART });
//           navigate("/order/placed");
//         } else {
//           toast("There was some error proccessing the payment", {
//             position: "bottom-center",
//             autoClose: 5000,
//             hideProgressBar: false,
//             closeOnClick: true,
//             pauseOnHover: true,
//             draggable: true,
//             progress: undefined,
//             theme: "dark",
//           });
//         }
//       }
//     } catch (error) {
//       payBtn.current.disabled = false;
//     }
//   };
//   useEffect(() => {
//     if (error) {
//       toast(error, {
//         position: "bottom-center",
//         autoClose: 5000,
//         hideProgressBar: false,
//         closeOnClick: true,
//         pauseOnHover: true,
//         draggable: true,
//         progress: undefined,
//         theme: "dark",
//       });
//       dispatchEvent(clearErrors);
//     }
//   }, [dispatch]);

//   return (
//     <Section>
      
//       <div className="paymentConatiner">
//         <h1>Payments</h1>
//         <form className="paymentForm" onSubmit={(e) => submitHandler(e)}>
//           <div>
//             <CreditCardIcon />
//             <CardNumberElement className="paymentInput" />
//           </div>
//           <div>
//             <EventIcon />
//             <CardExpiryElement className="paymentInput" />
//           </div>
//           <div>
//             <VpnKeyIcon />
//             <CardCvcElement className="paymentInput" />
//           </div>
//           <input
//             type="submit"
//             value={`Pay-${orderInfo.totalPrice}`}
//             ref={payBtn}
//             className="paymentBtn"
//           />
//         </form>
//         <p>
//           <i>
//             You can use <b>4242 4242 4242 4242</b> as your card number for
//             Testing Purpose
//           </i>
//         </p>
//       </div>
  
//       <ToastContainer />
//     </Section>
//   );
// };

// export default Payment;

// const Section = styled.section`
//   margin-top: 40px;
//   .paymentConatiner {
//     display: grid;
//     place-items: center;
//   }

//   .paymentBtn {
//     margin: 15px auto;
//     display: grid;
//     width: 100%;
//     background-color: #ff9900;
//     border: 1px solid;
//     border-radius: 0.3rem;
//     border-color: #a88734 #9c7e31 #846a29;
//   }
// `;
