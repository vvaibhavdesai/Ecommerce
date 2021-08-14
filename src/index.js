import { StrictMode } from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { CartProvider } from "./Context/CartContextProvider";
import { SearchProvider } from "./SearchContext";
import { BrowserRouter as Router } from "react-router-dom";
import { DataProvider } from "./Context/DataContext";
import { AuthProvider } from "./Context/AuthProvider";

const rootElement = document.getElementById("root");
ReactDOM.render(
  <StrictMode>
    <AuthProvider>
      <DataProvider>
        <CartProvider>
          <SearchProvider>
            <Router>
              <App />
            </Router>
          </SearchProvider>
        </CartProvider>
      </DataProvider>
    </AuthProvider>
  </StrictMode>,
  rootElement
);
