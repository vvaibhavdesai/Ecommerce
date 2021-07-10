import "./LoginPage.css";
import { useState } from "react";
import { useAuth } from './../../Context/AuthProvider';
import { useCart } from './../../Context/CartContextProvider';

export function LoginPage() {
  const [loginForm, setLoginForm] = useState(false);
  const [userName, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { loginManager, signUpManager } = useAuth()
  const { setWishList, setCart } = useCart()
  return (
    <div className="form-container">
      <form
        onSubmit={(e) => {
          e.preventDefault();
        }}
        className="form"
      >
        <h3 className="header">{loginForm ? `Sign-up` : `Login`}</h3>
        <div>
          {loginForm && (
            <input
              value={userName}
              className="form-input"
              placeholder="username"
              onChange={(e) => setUsername(e.target.value)}
            ></input>
          )}
        </div>
        <div>
          <input
            value={email}
            type="email"
            className="form-input"
            placeholder="email"
            onChange={(e) => setEmail(e.target.value)}
          ></input>
        </div>
        <div>
          <input
            value={password}
            type="password"
            className="form-input"
            placeholder="password"
            onChange={(e) => setPassword(e.target.value)}
          ></input>
        </div>
        <input
          className="form-submitbtn"
          type="submit"
          placeholder="Submit"
          onClick={() =>
            loginForm
              ? signUpManager(userName, email, password)
              : loginManager(email, password, setWishList,setCart)
          }
        ></input>

        <button
          onClick={() => {
            setLoginForm((prev) => !prev);
            console.log("inside onclick", loginForm);
          }}
        >
          {loginForm ? `Go to Login` : `Go to Sign-up`}
        </button>
      </form>
    </div>
  );
}
