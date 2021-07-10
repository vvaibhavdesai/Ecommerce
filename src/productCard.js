import { useCart } from "./Context/CartContextProvider";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from './Context/AuthProvider';
import { useEffect } from "react";

// function ProductCard({id,name,instock})
export function ProductCard({ item }) {
  const { cart, setCart, wishList, setWishList } = useCart();
  const navigate = useNavigate();
  const { userData } = useAuth()

  const cartClickHandler = (item) => {
    if (cart.find((items) => items._id === item._id)) {
      navigate("/cart");
    } else {
      setCart((items) => [...items, item]);
    }
  };

  const wishListClickHandler = (item) => {
    if (wishList.find((items) => items._id === item._id)) {

      setWishList((prev) => prev.filter((items) => items._id !== item._id));
    } else {
     
        setWishList((items) => [...items, item]);
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
          <p>{`fast-Delivery: ${item.fastDelivery}`}</p>
          <p>{`Material: ${item.material}`}</p>
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
