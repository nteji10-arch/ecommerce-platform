import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";

function ProductDetail() {
  const { id } = useParams();

  const [product, setProduct] = useState(null);

  useEffect(() => {
    axios
      .get(
        `http://127.0.0.1:8000/api/products/${id}/`
      )
      .then((res) => {
        setProduct(res.data);
      });
  }, [id]);

  if (!product) {
    return <h2>Loading...</h2>;
  }

  return (
    <div>
      <Navbar />

      <img
        src={product.image}
        alt={product.name}
        width="300"
      />

      <h1>{product.name}</h1>

      <p>{product.description}</p>

      <h2>₹{product.price}</h2>
    </div>
  );
}

export default ProductDetail;