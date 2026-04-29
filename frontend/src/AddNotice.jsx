import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";   // ✅ only once

function AddNotice() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  const addNotice = async () => {
    if (!title || !content) {
      toast.error("Please fill all fields ❌");
      return;
    }

    try {
      setLoading(true);

      await axios.post("http://localhost:5000/add", {
        title,
        content
      });

      toast.success("Notice Added Successfully ✅");

      setTitle("");
      setContent("");

      // 🔥 smooth refresh
      setTimeout(() => {
        window.location.reload();
      }, 500);

    } catch (err) {
      console.log(err);
      toast.error("Error adding notice ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h3>Add Notice</h3>

      <input
        type="text"
        placeholder="Enter Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <textarea
        placeholder="Enter Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />

      <button onClick={addNotice} disabled={loading}>
        {loading ? "Adding..." : "Add Notice"}
      </button>
    </div>
  );
}

export default AddNotice;