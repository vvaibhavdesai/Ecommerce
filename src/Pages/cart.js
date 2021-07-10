import { useCart } from "../Context/CartContextProvider";
import { useNavigate } from "react-router-dom";
import { useAuth } from './../Context/AuthProvider';
import { useEffect } from 'react';
import axios from "axios"

function CartTemplate({ item }) {
  const { setCart } = useCart();


  return (
    <div>
      <table className="cart_table">
        <thead className="theadwa">
          <tr>
            <th></th>
            <th></th>
            <th>Product</th>
            <th>price</th>
            <th>quantity</th>
            <th>subtotal</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <button
                onClick={() =>
                  setCart((prev) => prev.filter((items) => item !== items))
                }
              >
                <i className="fa fa-trash"></i>
              </button>
            </td>
            <td>
              <img src={item.image} />
            </td>
            <td>`${item.name}`</td>
            <td>
              <span> ${`${item.price}`}</span>
            </td>
            <td className="td-quantity-btn">
              <button
                onClick={() =>
                  setCart((prevState) =>
                    prevState.map((items) =>
                      items._id === item._id
                        ? { ...items, quantity: item.quantity + 1 }
                        : items
                    )
                  )
                }
              >
                <i className="fa fa-plus"></i>
              </button>
              <span>{item.quantity}</span>
              <button
                disabled={item.quantity === 1}
                onClick={() =>
                  setCart((prevState) =>
                    prevState.map((items) =>
                      items._id === item._id
                        ? { ...items, quantity: item.quantity - 1 }
                        : items
                    )
                  )
                }
              >
                <i className="fa fa-minus"></i>
              </button>
            </td>
            <td>
              <span>${item.quantity * item.price}</span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
export function Cart() {
  const { cart } = useCart();
  const navigate = useNavigate();
  const reducer = (accumulator, cart) => {
    return accumulator + cart.price * cart.quantity;
  };

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
          <h2>cart price:{cart.reduce(reducer, 0)}</h2>
        </div>
      );
    }
  };
  return (
    <div>
      <div>{cartitle()}</div>
      <div
        style={{ display: "flex", flexDirection: "column", flexWrap: "wrap" }}
      >
        {cart.map((item) => (
          <CartTemplate item={item} />
        ))}
      </div>
    </div>
  );
}
