import { useCart } from "../Context/CartContextProvider";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./../Context/AuthProvider";
import { useEffect } from "react";
import axios from "axios";
import { CartTemplate } from "./CartTemplate";
import { ToastContainer, toast } from "react-toastify";

export function Cart() {
  const { cart,setCart } = useCart();
  const navigate = useNavigate();
  const reducer = (accumulator, cart) => {
    return accumulator + cart.price * cart.quantity;
  };
  async function displayRazorpay(total) {
    console.log(total,"arey total ayi kya ?")
    try {
      const { data } = await axios.post(
        `https://mongoDBInventorySetup.vaibhavdesai888.repl.co/user/checkout`,
        {
          data: {
            amount: total,
          },
        }
      );
      console.log(data.orderDetails,"res h kya ??")
      const options = {
        order_id:data.orderDetails.id,
        amount:data.orderDetails.amount,
        currency:data.orderDetails.currency,
        key: "rzp_test_sXXRddEDPlPG8r",
        name: "Khazana Cart",
        description: "Test Transaction",
        image: "https://example.com/your_logo",
        handler: function (response) {
          setCart([])
          notify("Order Placed, Happy Shopping!")
          
        },
        prefill: {
          name: " testman kumar ",
          email: "testman.kumar@example.com",
          contact: "9999999999",
        },
      };
      const paymentObject = new Razorpay(options);
      paymentObject.open();
    } catch (error) {
      console.log(error.message,"yeh hai error bantai");
    }
  }

  function loadRazorpay(total) {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    document.body.appendChild(script);
    script.onload = ()=>displayRazorpay(total);
  }
  const total = cart.reduce(reducer, 0);

  const notify=(message)=>toast.dark(message, {
    position: "bottom-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  })

  const cartitle = () => {
    if (cart.length === 0) {
      return (
        <div>
          <h2>Add items to the Cart</h2>
          <button
            className="use-anywhere-btn"
            onClick={() => {
              navigate("/");
            }}
          >
            Go to Products
          </button>
        </div>
      );
    } else {
      return (
        <div>
          <h2>cart price:{total}</h2>
        </div>
      );
    }
  };
  return (
    <div>
      <div><span>{cartitle()}</span><span>{cart.length >0 && <button onClick={()=>loadRazorpay(total)} className="use-anywhere-btn checkout-btn">
        Buy Now
      </button>}</span></div>
      <div
        style={{ display: "flex", flexDirection: "column", flexWrap: "wrap" }}
      >
        {cart.map((item) => (
          <CartTemplate item={item} />
        ))}
      </div>
      <ToastContainer
            position="bottom-right"
            autoClose={2000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
    </div>
  );
}
