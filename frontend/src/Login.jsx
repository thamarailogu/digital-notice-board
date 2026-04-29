import { useState, useEffect } from "react";   // 🔥 useEffect add
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  // 🔥 AUTO REDIRECT IF ALREADY LOGGED IN
  useEffect(() => {
    if (localStorage.getItem("admin")==="true") {
      navigate("/admin", { replace: true});
    }
  }, [navigate]);

  const handleLogin = async () => {
    try {
      const res = await axios.post("http://localhost:5000/login", {
        username,
        password
      });

      if (res.data.success) {
        localStorage.setItem("admin", "true");

        toast.success("Login Successful ✅");

        setTimeout(() => {
          navigate("/admin", { replace: true });
        }, 500);
      }

    } catch (err) {
      toast.error("Invalid Login ❌");
    }
  };

  return (
    <div className="container">
      <h2>Admin Login</h2>

      <input
        type="text"
        placeholder="Username"
        onChange={(e) => setUsername(e.target.value)}
      />

      <input
        type="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      />

      <button onClick={handleLogin}>Login</button>
    </div>
  );
}

export default Login;