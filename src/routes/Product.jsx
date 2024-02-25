import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom"; // Import useParams
import { useNavigate } from "react-router-dom";
import "./Product.css";
const Product = () => {
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const { productId } = useParams(); // Corrected to match the route parameter name in App component
  const [error, setError] = useState(null);
  console.log(productId);
  useEffect(() => {
    const fetchPost = async () => {
      try {
        // Use the postId from the URL to fetch the specific post
        const response = await axios.get(
          `http://localhost:5555/api/product/${productId}`
        );
        setProduct(response.data);
      } catch (error) {
        console.error("Error fetching post:", error);
        setError(error);
      }
    };

    fetchPost();
  }, [productId]); // Include postId in the dependency array to re-fetch if the postId changes

  if (error) {
    navigate("/404-not-found");
  }

  if (!product) {
    return <div>Loading...</div>;
  }
  // Check if the current user is the creator of the post
  return (
    <div className="postDetailCard">
      <h2>{product.name}</h2>
      <p>{product.category}</p>

      <div className="postActions">
        <Link to={`/product/edit/${product._id}`} className="editButton">
          Edit
        </Link>
        <Link to={`/product/delete/${product._id}`} className="deleteButton">
          Delete
        </Link>
      </div>
    </div>
  );
};

export default Product;
