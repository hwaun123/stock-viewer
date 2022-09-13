import { BrowserRouter, Route, Routes } from "react-router-dom";
import Main from "./Main";
import ViewStock from "./ViewStock";
import SearchProvider from "./Contexts/SearchStockContext";
function App() {
  return (
    <SearchProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Main />}></Route>
          <Route path="/stock/:name" element={<ViewStock />}></Route>
        </Routes>
      </BrowserRouter>
    </SearchProvider>
  );
}

export default App;
