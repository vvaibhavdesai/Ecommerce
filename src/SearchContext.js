import { createContext, useState, useContext } from "react";

export const SearchContext = createContext();

export function SearchProvider({ children }) {
  const [search, setSearch] = useState("");
  const [keydown, setKeydown] = useState("");

  return (
    <SearchContext.Provider
      value={{
        search,
        setSearch,
        keydown,
        setKeydown
      }}
    >
      {children}
    </SearchContext.Provider>
  );
}

export function useSearch() {
  return useContext(SearchContext);
}
