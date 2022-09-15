import { BrowserRouter, Route, Routes } from "react-router-dom";
import Main from "./Pages/Main";
import ViewStock from "./Pages/ViewStock";
import "./App.css";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Main />}></Route>
          <Route path="/stock/:name" element={<ViewStock />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
