import { useCart } from "./Context/CartContextProvider";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from './Context/AuthProvider';
import { toast } from "react-toastify";
import { useEffect } from "react";

// function ProductCard({id,name,instock})
export function ProductCard({ item }) {
  const { cart, setCart, wishList, setWishList } = useCart();
  const navigate = useNavigate();
  const { userData } = useAuth()

  const notify=(message)=>toast.dark(message, {
    position: "bottom-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  })

  const cartClickHandler = (item) => {
    if (cart.find((items) => items._id === item._id)) {
      navigate("/cart");
    } else {
      setCart((items) => [...items, item]);
      notify('Item added to Cart')
    }
  };

  const wishListClickHandler = (item) => {
    if (wishList.find((items) => items._id === item._id)) {

      setWishList((prev) => prev.filter((items) => items._id !== item._id));
    } else {
     
        setWishList((items) => [...items, item]);
        notify('Item added to WishList')
      }
  };


  return (
    <div className="product-card">
      <div className="badge">Hot</div>
      <div className="product-tumb">
        <img src={item.image} alt="" />
      </div>
      <div className="product-details">
        <span className="product-catagory">Women,bag</span>
        <h4>
          <a href="">{`${item.name}`}</a>
        </h4>
        <div>
          <p>{`Brand: ${item.brand}`}</p>
          <p>{`fast-Delivery: ${`${item.fastdelivery  ? `Yes`:`NO`} `}`}</p>
          <p>{`Stock: ${`${item.inStock  ? `Yes`:`NO`} `}`}</p>
          <p className="product-price">{`${item.offer}`}</p>
        </div>
        <div className="product-bottom-details">
          <div className="product-price">
            <small></small>₹{`${item.price}`}
          </div>
          <div className="product-action">
            <button
              onClick={() => {
                wishListClickHandler(item);
              }}
            >
              {wishList.find((items) => items._id === item._id) ? (
                <i style={{ color: "red" }} className="fa fa-heart"></i>
              ) : (
                <i className="fa fa-heart"></i>
              )}
            </button>
            <button
              onClick={() => {
                cartClickHandler(item);
              }}
            >
              {cart.find((items) => items._id === item._id) ? (
                <i className="fa fa-shopping-bag"></i>
              ) : (
                <i className="fa fa-shopping-cart"></i>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
