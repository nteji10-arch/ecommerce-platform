import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";

function Orders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("access");

    axios
      .get(
        "http://127.0.0.1:8000/api/orders/orders/",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        setOrders(res.data);
      })
      .catch((err) => {
        console.log(err.response?.data);
      });
  }, []);

  return (
    <div>
      <Navbar />

      <h1>My Orders</h1>

      {orders.length === 0 ? (
        <p>No orders found</p>
      ) : (
        orders.map((order) => (
            <div key={order.id}
            className="order-item"
>
            <h3>Order #{order.id}</h3>

            <p>Total: ₹{order.total_amount}</p>

            <hr />
          </div>
        ))
      )}
    </div>
  );
}

export default Orders;