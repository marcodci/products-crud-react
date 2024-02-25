import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";

import Products from "./routes/Products";
import Product from "./routes/Product.jsx";
import AddProduct from "./routes/AddProduct.jsx";
import EditProduct from "./components/EditProduct.jsx";
import DeleteProduct from "./routes/DeleteProduct.jsx";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navbar />}>
          <Route path="products" element={<Products />} />
          <Route path="product/:productId" element={<Product />} />
          <Route path="new-product" element={<AddProduct />} />
          <Route path="product/edit/:productId" element={<EditProduct />} />
          <Route path="product/delete/:productId" element={<DeleteProduct />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
