import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import axios from "axios";

function NoticeList() {
  const [notices, setNotices] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState("");

  // 🔥 Fetch data
  const fetchData = async (pageNum = 1) => {
    try {
      const res = await axios.get(
        `http://localhost:5000/view?page=${pageNum}&limit=5`
      );

      setNotices(res.data.data);
      setTotalPages(res.data.pages);
      setPage(res.data.page);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchData(page);
  }, [page]);

  // 🔥 PIN TOGGLE
  const togglePin = async (id) => {
    console.log("PIN CLICK 👉", id);
    await axios.put(`http://localhost:5000/pin/${id}`);
    toast.success("Pin updated 📌");
    fetchData(page);
  };

  // 🔥 Time format
  const formatTime = (date) => {
    const now = new Date();
    const past = new Date(date);
    const diff = Math.floor((now - past) / 1000);

    if (diff < 60) return "Just now";
    if (diff < 3600) return Math.floor(diff / 60) + " min ago";
    if (diff < 86400) return Math.floor(diff / 3600) + " hrs ago";

    return past.toLocaleDateString();
  };

  // 🔥 Highlight search
  const highlightText = (text) => {
    if (!search) return text;

    const parts = text.split(new RegExp(`(${search})`, "gi"));

    return parts.map((part, i) =>
      part.toLowerCase() === search.toLowerCase() ? (
        <span key={i} className="highlight">{part}</span>
      ) : (
        part
      )
    );
  };

  // 🔥 Filter
  const filteredNotices = notices.filter(
    (n) =>
      n.title.toLowerCase().includes(search.toLowerCase()) ||
      n.content.toLowerCase().includes(search.toLowerCase())
  );

  // 🔥 Delete
  const deleteNotice = async (id) => {
    if (!window.confirm("Delete this notice?")) return;

    console.log("DELETE ID 👉", id);

    await axios.delete(`http://localhost:5000/delete/${id}`);
    toast.success("Deleted Successfully ✅");

    fetchData(page);
  };

  // 🔥 Edit
  const editNotice = async (id, oldTitle, oldContent) => {
    console.log("EDIT ID 👉", id);

    const newTitle = prompt("Enter new title", oldTitle);
    const newContent = prompt("Enter new content", oldContent);

    if (!newTitle || !newContent) return;

    await axios.put(`http://localhost:5000/update/${id}`, {
      title: newTitle,
      content: newContent
    });

    toast.info("Updated Successfully ✏");

    fetchData(page);
  };

  return (
    <div className="container">
      <h2>Notices</h2>

      {/* 🔍 Search */}
      <input
        type="text"
        placeholder="Search notices..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {filteredNotices.length === 0 ? (
        <div className="empty-state">
          <h3>No Matching Notices 🔍</h3>
        </div>
      ) : (
        <>
          {/* 🔥 Cards */}
          {filteredNotices.map((n) => {
            console.log("NOTICE ID 👉", n._id);

            return (
              <div
                key={n._id}
                className={`notice-card ${n.pinned ? "pinned" : ""}`}
              >
                {/* 🔥 PIN ICON ADDED HERE */}
                <h3>
                  {n.pinned && <span className="pin-badge">📌</span>}
                  {highlightText(n.title)}
                </h3>

                <p>{highlightText(n.content)}</p>

                <p className="time">{formatTime(n.createdAt)}</p>

                <div className="notice-actions">
                  <button onClick={() => editNotice(n._id, n.title, n.content)}>
                    Edit
                  </button>

                  <button onClick={() => deleteNotice(n._id)}>
                    Delete
                  </button>

                  <button onClick={() => togglePin(n._id)}>
                    {n.pinned ? "Unpin 📌" : "Pin 📍"}
                  </button>
                </div>
              </div>
            );
          })}

          {/* 🔥 Pagination */}
          <div className="pagination">
            <button
              disabled={page === 1}
              onClick={() => setPage(page - 1)}
            >
              ⬅ Prev
            </button>

            <span>
              Page {page} / {totalPages}
            </span>

            <button
              disabled={page === totalPages}
              onClick={() => setPage(page + 1)}
            >
              Next ➡
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default NoticeList;