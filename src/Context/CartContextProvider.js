import { createContext, useState, useContext } from "react";

export const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [wishList, setWishList] = useState([]);

  return (
    <CartContext.Provider
      value={{
        cart,
        setCart,
        wishList,
        setWishList,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
