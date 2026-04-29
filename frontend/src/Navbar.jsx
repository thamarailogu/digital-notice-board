import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

function Navbar() {
  const [dark, setDark] = useState(false);

  // 🔥 check login
  const isAdmin = localStorage.getItem("admin");

  // 🌙 dark mode apply
  useEffect(() => {
    if (dark) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }, [dark]);

  // 🔐 logout
  const handleLogout = () => {
    localStorage.removeItem("admin");
    window.location.href = "/login";
  };

  return (
    <div className="navbar">
      <h2>📢 Digital Notice Board</h2>

      <div className="nav-links">
        <Link to="/">Home</Link>

        {/* 🔥 if logged in show admin */}
        {isAdmin && <Link to="/admin">Admin</Link>}

        {/* 🔥 login / logout toggle */}
        {!isAdmin ? (
          <Link to="/login">Login</Link>
        ) : (
          <button onClick={handleLogout}>Logout</button>
        )}

        {/* 🌙 Dark mode */}
        <button onClick={() => setDark(!dark)} className="toggle-btn">
          {dark ? "🌙 Dark" : "☀ Light"}
        </button>
      </div>
    </div>
  );
}

export default Navbar;