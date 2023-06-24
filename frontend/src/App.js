import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProductList from "./components/ProductList";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ProductList />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
