import { createContext, useContext, useState } from "react";

const searchStockContext = createContext(null);

const searchProvider = ({ children }) => {
  const [searchState, setSearchState] = useState;

  return (
    <searchStockContext.searchProvider value={searchState}>
      {children}
    </searchStockContext.searchProvider>
  );
};

export const useSearch = () => {
  const contextData = useContext(searchStockContext);
  if (!contextData) throw new Error("Provider에 감싸주세요");
  return contextData;
};

export default searchProvider;
