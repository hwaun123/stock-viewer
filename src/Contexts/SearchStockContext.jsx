import { createContext, useContext, useState } from "react";

const searchStockContext = createContext(null);

const SearchProvider = ({ children }) => {
  const [searchState, setSearchState] = useState();

  return (
    <searchStockContext.Provider value={[searchState, setSearchState]}>
      {children}
    </searchStockContext.Provider>
  );
};

export const useSearch = () => {
  const contextData = useContext(searchStockContext);
  if (!contextData) throw new Error("Provider에 감싸주세요");
  return contextData;
};

export default SearchProvider;
