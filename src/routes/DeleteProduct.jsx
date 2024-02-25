import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./DeleteProduct.css"; // Make sure to create this CSS file
const DeleteProduct = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5555/api/product/${productId}`
        );
        setProduct(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching product:", error);
        setIsLoading(false);
      }
    };

    fetchPost();
  }, [productId]);

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:5555/api/product/${productId}`, {});
      navigate("/products");
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="deletePostCard">
      <h3>Are you sure you want to delete this item?</h3>
      <div className="postDetails">
        <p>Name: {product?.name}</p>
        <p>Category: {product?.category}</p>
      </div>
      <div>
        <button className="deleteButton" onClick={handleDelete}>
          Yes
        </button>
        <button className="cancelButton" onClick={() => navigate("/products")}>
          No
        </button>
      </div>
    </div>
  );
};

export default DeleteProduct;
