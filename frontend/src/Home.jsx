import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="home">
      <div className="home-card">
        <h1>📢 Digital Notice Board</h1>

        <p className="tagline">
          Manage and share notices efficiently in real-time
        </p>

        <div className="features">
          <p>📌 Add / Edit / Delete Notices</p>
          <p>🔍 Search Notices</p>
          <p>📌 Pin Important Notices</p>
          <p>🌙 Dark / Light Mode</p>
        </div>

        <div className="home-buttons">
          <Link to="/notices" className="btn">View Notices</Link>
          <Link to="/login" className="btn admin">Admin Login</Link>
        </div>
      </div>
    </div>
  );
}

export default Home;