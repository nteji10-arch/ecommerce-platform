import axios from "axios";
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";

function Home() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    axios
      .get(
        `http://127.0.0.1:8000/api/products/?search=${search}`
      )
      .then((res) => {
        setProducts(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [search]);

  const addToCart = async (productId) => {
    try {
      const token = localStorage.getItem("access");

      await axios.post(
        "http://127.0.0.1:8000/api/orders/cart-items/",
        {
          cart: 1,
          product: productId,
          quantity: 1,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Added to cart");
    } catch (error) {
      console.log(error.response?.data);
      alert("Failed");
    }
  };

  return (
    <div>
  <h1 className="page-title">
    E-Commerce Store
  </h1>

  <input
    className="search-box"
    type="text"
    placeholder="Search products..."
    value={search}
    onChange={(e) =>
      setSearch(e.target.value)
    }
  />

    <div className="products-container">
      <br />
      <br />

      {products.map((product) => (
        <div
          key={product.id}
          className="product-card"
>
          <img
            src={product.image}
            alt={product.name}
            width="200"
          />

          <h3>
            <Link to={`/product/${product.id}`}>{product.name}</Link>
          </h3>

          <p>{product.description}</p>

          <p>₹{product.price}</p>

          <button
            onClick={() => addToCart(product.id)}
          >
            Add To Cart
          </button>

          <hr />
        </div>
      ))}
    </div>
  </div>
  );
}

export default Home;