import React, { useState } from "react";
import axios from "axios";
import "./AddProduct.css";
import { useNavigate } from "react-router-dom";
import { renderBaseUrl, localBaseUrl } from "../baseurl.js";

const AddProduct = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    setSubmitting(true);

    try {
      await axios.post(`${renderBaseUrl}/api/products`, {
        name,
        category,
      });

      navigate("/products");
    } catch (error) {
      console.error("Error creating post:", error);
      alert("Error creating post.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="createPostForm" noValidate>
      <div>
        <label htmlFor="name">Name</label>
        <input
          id="name"
          name="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          minLength="5"
          required
        />
      </div>
      <div>
        <label htmlFor="category">Category</label>
        <textarea
          id="category"
          name="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          minLength="5"
          required
        />
      </div>

      <button type="submit" disabled={submitting}>
        Create Product
      </button>
    </form>
  );
};

export default AddProduct;
