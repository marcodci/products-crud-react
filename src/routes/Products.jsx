import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./Products.css";
import { renderBaseUrl } from "../baseurl.js";
const Products = () => {
  console.log("RENDER");
  const [products, setProducts] = useState({
    products: [],
    isLoading: true,
    totalItems: 0,
  });

  useEffect(() => {
    const fetchPosts = async () => {
      setProducts((prevState) => ({ ...prevState, isLoading: true }));

      try {
        const response = await axios.get(`${renderBaseUrl}/api/products`);
        console.log(response.data);
        setProducts((prev) => ({
          ...prev,
          isLoading: false,
          products: response.data,
        }));
      } catch (err) {
        console.log(err);
      }
    };

    fetchPosts();
  }, []);

  if (products.isLoading) {
    return <div>Loading products...</div>;
  }

  return (
    <div>
      <h2>Products</h2>
      {products.products && (
        <ul className="postsList">
          {products.products.map((product) => (
            <Link
              to={`/product/${product._id}`}
              key={product._id}
              className="product"
            >
              <li>
                <h3>{product.name}</h3>
              </li>
            </Link>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Products;
