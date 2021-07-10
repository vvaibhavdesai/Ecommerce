import "./styles.css";
import { ProductListing } from "./productListing";
import { Cart } from "./Pages/cart";
import { WishList } from "./Pages/WishList";
import { useCart } from "./Context/CartContextProvider";
import { Routes, Route, useNavigate } from "react-router-dom";
import Navigation from "./Navigation/Navigation";
import { LoginPage } from "./Pages/LoginPage/LoginPage";
import { PrivateRoute } from "./Context/PrivateRoute";
import { useEffect } from "react";
import axios from "axios";
import { useAuth } from "./Context/AuthProvider";

export default function App() {
  const { cart, wishList, setWishList, setCart } = useCart();
  const { setUserData, userData, setUserLogin, isUserLogin, setUserToken,userToken } = useAuth();
  const navigate = useNavigate()
  console.log(userToken,"yeh dekih aya token")

  useEffect(() => {
    if (!isUserLogin) {
      (async function () {
        try {
          let tempToken = localStorage?.getItem("login");
          tempToken = tempToken && JSON.parse(tempToken);
          const { data } = await axios.post(
            "https://mongoDBInventorySetup.vaibhavdesai888.repl.co/user/login",
            {},
            { headers: { Authorization: tempToken?.token } }
          );
          setUserData(data.user);
          setUserLogin(true);
          setWishList(data.user.wishList);
          setCart(data.user.cart);
          setUserToken(tempToken?.token)
          console.log(data, "this is from app component");
        } catch (error) {
          console.log(error.message, "this is error  from app component");
        }
      })();
    }
  }, []);

  useEffect(()=>{
    if(userToken){
      navigate('/')
    }
  },[userToken])

  useEffect(() => {
    if (isUserLogin && cart.length > 0 && wishList.length > 0) {
      (async function () {
        try {
          console.log(wishList, cart, "in the  try");
          const data = await axios.post(
            `https://mongodbinventorysetup.vaibhavdesai888.repl.co/user/${userData._id}`,
            {
              data: {
                cart: cart,
                wishList: wishList,
              },
            }
          );
          console.log(data.user.cart, "this is from try updater for cart");
          console.log(data.user.cart, "this is from try updater for cart");
        } catch (error) {
          console.log(error.message, "this is from catch block");
        }
      })();
    }
  }, [cart, wishList]);

  return (
    <div className="App">
      <Navigation wishList={wishList} cart={cart} />
      <Routes>
        <PrivateRoute path="/cart" element={<Cart />} />
        <Route path="/" element={<ProductListing />} />
        <PrivateRoute path="/wishlist" element={<WishList />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </div>
  );
}
