import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Navbar from "./Navbar";
import AdminDashboard from "./AdminDashboard";
import NoticeList from "./NoticeList";
import Login from "./Login";
import Home from "./Home";   // 🔥 NEW

function App() {
  const isAdmin = localStorage.getItem("admin") === "true";

  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        {/* 🔥 HOME PAGE */}
        <Route path="/" element={<Home />} />

        {/* 🔥 PUBLIC NOTICE LIST */}
        <Route path="/notices" element={<NoticeList />} />

        {/* 🔥 LOGIN */}
        <Route path="/login" element={<Login />} />

        {/* 🔥 PROTECTED ADMIN */}
        <Route
          path="/admin"
          element={isAdmin ? <AdminDashboard /> : <Login />}
        />
      </Routes>

      <ToastContainer position="top-right" autoClose={2000} />
    </BrowserRouter>
  );
}

export default App;