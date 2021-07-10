import { useContext, createContext, useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isUserLogin, setUserLogin] = useState(false);
  const [userToken, setUserToken] = useState(null);
  const [userData, setUserData] = useState(null);
  
  

  const setLocalStorage = ({ token }) => {
    if (localStorage) {
      setUserToken(token);
      setUserLogin(true);
      console.log(token, "setLocalstorage");
      return localStorage.setItem(
        "login",
        JSON.stringify({ userLoggedIn: true, token })
      );
    }
  };

  const signUpManager=async(userName, email, password)=> {
    try {
      const { data } = await axios.post(
        "https://mongoDBInventorySetup.vaibhavdesai888.repl.co/user/signup",
        {
          data: {
            name: userName,
            email: email,
            password: password,
          },
        }
      );
      setLocalStorage(data);
      setUserData(data.user);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  }

  const logoutManager = (navigate) => {
    if (localStorage) {
      console.log("from logout manager")
      localStorage.removeItem("login");
      setUserLogin(false);
      setUserToken(null);
      navigate('/login')
    }
  };

  const loginManager = async (email, password,setWishList,setCart) => {
    try {
      const { data } = await axios.post(
        "https://mongoDBInventorySetup.vaibhavdesai888.repl.co/user/login",
        {
          data: {
            email: email,
            password: password,
          },
        }
      );

      if (data.success) {
        setLocalStorage(data);
      }
      setUserData(data.user);
      setWishList(data.user.wishList)
      setCart(data.user.cart)
      console.log(data.user, "this is user ka data");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        isUserLogin,
        userToken,
        loginManager,
        signUpManager,
        logoutManager,
        userData,
        setUserLogin,
        setUserToken,
        setUserData
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
