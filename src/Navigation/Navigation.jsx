import { NavLink, useNavigate } from "react-router-dom";
import SearchBar from "../SearchBar";
import { useSearch } from "../SearchContext";
import "./Navigation.css";
import { useState } from "react";
import { useAuth } from "./../Context/AuthProvider";

function Navigation({ wishList, cart }) {
  const { search, setSearch, setKeydown } = useSearch();
  const [show, setShow] = useState(false);
  const { isUserLogin, logoutManager } = useAuth();
  const navigate = useNavigate()

  return (
    <nav>
      <div className="nav-content">
        <div className="nav-search">
          <div>
            <SearchBar
              search={search}
              setSearch={setSearch}
              setKeydown={setKeydown}
            />
          </div>
        </div>
        <div className="nav-dropdown">
          <button
            className="drop-trigger"
            onClick={() => setShow((prev) => !prev)}
          >
            <i className="fa fa-ellipsis-v"></i>
          </button>
          <div className={`nav-btn-group ${show ? `` : `close`}`}>
            <div>
              <NavLink to="/">
                <button className="use-anywhere-btn color-2">See All</button>
              </NavLink>
            </div>
            <div className="nav-wishlist">
              <NavLink to="/wishlist">
                <button className="use-anywhere-fa color color-2">
                  <i className="fa fa-heart">
                    {wishList.length > 0 ? wishList.length : null}
                  </i>
                </button>
              </NavLink>
            </div>

            <div className="nav-cart">
              <NavLink to="/cart">
                <button className="use-anywhere-fa color color-2">
                  <i className="fa fa-shopping-bag">
                    {cart.length > 0 ? cart.length : null}
                  </i>
                </button>
              </NavLink>
            </div>

            {!isUserLogin && (
              <div>
                <NavLink to="/login">
                  <button className="nav-login-button color-2">Login</button>
                </NavLink>
              </div>
            )}
            {isUserLogin && (
              <div>
                <button
                  onClick={() => logoutManager(navigate)}
                  className="nav-login-button color-2"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navigation;
