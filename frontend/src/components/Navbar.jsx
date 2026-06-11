import { Link } from "react-router-dom";

function Navbar() {
  const logout = () => {
    localStorage.clear();
    window.location.href = "/login";
  };

  return (
  <div className="navbar">
    <Link to="/">Home</Link>

    <Link to="/cart">Cart</Link>

    <Link to="/orders">Orders</Link>

    <button onClick={logout}>
      Logout
    </button>
  </div>
);
}

export default Navbar;