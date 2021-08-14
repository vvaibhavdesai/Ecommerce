const wishlistToCartHandler = ({ item, cart, setCart, navigate }) => {
  if (cart.find((items) => items._id === item._id)) {
    navigate("/cart");
  } else {
    setCart((items) => [...items, item]);
  }
};
export default wishlistToCartHandler;
