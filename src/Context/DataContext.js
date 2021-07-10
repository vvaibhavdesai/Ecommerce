import { createContext, useEffect, useReducer, useContext } from "react";
import axios from "axios";

export const DataContext = createContext();

function dataReducer(state, action) {
  switch (action.type) {
    case "GET_DATA":
      return { ...state, productData: action.payload };
    default:
      return state;
  }
}

export function DataProvider({ children }) {
  const [{ productData }, dispatch] = useReducer(dataReducer, {
    productData: [],
  });

  useEffect(() => {
    (async () => {
      try {
        if (productData.length === 0) {
          const response = await axios.get(
            "https://mongoDBInventorySetup.vaibhavdesai888.repl.co/products"
          );
          console.log(response.data.products);
          dispatch({ type: "GET_DATA", payload: response.data.products });
        }
      } catch (error) {
        console.error("this is error", error);
      }
    })();
  }, []);

  return (
    <DataContext.Provider value={{ productData }}>
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  return useContext(DataContext);
}
