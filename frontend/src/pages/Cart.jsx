import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";

function Cart() {
  const [cartItems, setCartItems] = useState([]);

  const fetchCartItems = () => {
    const token = localStorage.getItem("access");

    axios
      .get("http://127.0.0.1:8000/api/orders/cart-items/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setCartItems(res.data);
      })
      .catch((err) => {
        console.log(err.response?.data);
      });
  };

  useEffect(() => {
    fetchCartItems();
  }, []);

  const removeItem = async (id) => {
    const token = localStorage.getItem("access");

    try {
      await axios.delete(
        `http://127.0.0.1:8000/api/orders/cart-items/${id}/`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      fetchCartItems();
    } catch (error) {
      console.log(error);
    }
  };

  const placeOrder = async () => {
    const token = localStorage.getItem("access");

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/orders/place-order/",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert(response.data.message);

      fetchCartItems();
    } catch (error) {
      console.log(error.response?.data);
      alert("Failed");
    }
  };

  const total = cartItems.reduce(
    (sum, item) =>
      sum + Number(item.price || 0) * item.quantity,
    0
  );

  return (
    <div>
      <Navbar />

      <h1>My Cart</h1>

      <h3>Items Count: {cartItems.length}</h3>

      <h3>Total: ₹{total}</h3>

      <button onClick={placeOrder}>
        Place Order
      </button>

      <hr />

      {cartItems.map((item) => (
        <div key={item.id}>
          <h3>{item.product_name}</h3>

          <p>Price: ₹{item.price}</p>

          <p>Quantity: {item.quantity}</p>

          <button
            onClick={() => removeItem(item.id)}
          >
            Remove
          </button>

          <hr />
        </div>
      ))}
    </div>
  );
}

export default Cart;