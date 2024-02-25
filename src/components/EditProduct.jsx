import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./EditProduct.css";

const EditProduct = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    const fetchPost = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(
          `http://localhost:5555/api/product/${productId}`
        );
        console.log(response.data);
        const { name, category } = response.data;

        setName(name);
        setCategory(category);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching post details:", error);
        setIsLoading(false);
      }
    };

    fetchPost();
  }, [productId]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    const formData = new FormData();
    formData.append("name", name);
    formData.append("category", category);
    console.log(name, category);
    try {
      await axios.put(`http://localhost:5555/api/product/${productId}`, {
        name,
        category,
      });
      navigate(`/product/${productId}`);
    } catch (error) {
      console.error("Error updating product:", error);
      alert("Error updating product.");
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <form onSubmit={handleSubmit} className="editPostForm">
      <div>
        <label htmlFor="name">Name</label>
        <input
          id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="category">Category</label>
        <textarea
          id="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
        />
      </div>

      <button type="submit" disabled={isLoading}>
        Update Product
      </button>
    </form>
  );
};

export default EditProduct;
