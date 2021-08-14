import { useCart } from "../Context/CartContextProvider";

export function CartTemplate({ item }) {
  const { setCart } = useCart();


  return (
    <div className="cart_table_center">
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
                onClick={() => setCart((prev) => prev.filter((items) => item !== items))}
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
                onClick={() => setCart((prevState) => prevState.map((items) => items._id === item._id
                  ? { ...items, quantity: item.quantity + 1 }
                  : items
                )
                )}
              >
                <i className="fa fa-plus"></i>
              </button>
              <span>{item.quantity}</span>
              <button
                disabled={item.quantity === 1}
                onClick={() => setCart((prevState) => prevState.map((items) => items._id === item._id
                  ? { ...items, quantity: item.quantity - 1 }
                  : items
                )
                )}
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
