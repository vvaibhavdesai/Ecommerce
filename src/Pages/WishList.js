import { useCart } from "../Context/CartContextProvider";
import { Navigate, useNavigate } from "react-router-dom";
import wishlistToCartHandler from "../Logic/wishlistToCartHandler";
import { useAuth } from "./../Context/AuthProvider";
import axios from "axios";
import { useEffect } from "react"

export function WishList() {
  const { wishList, setWishList, cart, setCart } = useCart();
  const navigate = useNavigate();

  
  const wishListCount = () => {
    if (wishList.length > 0) {
      return <h2>WishList:{wishList.length}</h2>;
    } else {
      return (
        <div>
          <h2>Add item to wishList</h2>
          <button className="use-anywhere-btn" onClick={() => navigate("/")}>
            Go to Products
          </button>
        </div>
      );
    }
  };
  


  return (
    <section className="wishlist-listing">
      {wishListCount()}
      {wishList.map((item) => (
        <div key={item._id}className="product-card">
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
              <p>{`instock: ${item.inStock} || fast-Delivery: ${item.fastDelivery}`}</p>
              <p>{`Material: ${item.material}`}</p>
            </div>
            <div className="product-bottom-details">
              <div className="product-price">
                <small>{`${item.offer}`}</small>₹{`${item.price}`}
              </div>
              <div className="product-action">
                <button
                  onClick={() =>
                    setWishList((prev) =>
                      prev.filter((items) => items._id !== item._id)
                    )
                  }
                >
                  {wishList.find((items) => items._id === item._id) ? (
                    <i style={{ color: "red" }} className="fa fa-heart"></i>
                  ) : (
                    <i className="fa fa-heart"></i>
                  )}
                </button>
                <button
                  onClick={() => {
                    wishlistToCartHandler({ item, cart, setCart, navigate });
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
      ))}
    </section>
  );
}
