const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// 🔥 MongoDB connect
mongoose.connect("mongodb://127.0.0.1:27017/noticeDB")
  .then(() => console.log("MongoDB Connected ✅"))
  .catch(err => console.log(err));

// 🔥 Schema (PIN + TIMESTAMP)
const NoticeSchema = new mongoose.Schema({
  title: String,
  content: String,
  pinned: { type: Boolean, default: false }
}, { timestamps: true });

const Notice = mongoose.model("Notice", NoticeSchema);

// 🔐 LOGIN
app.post("/login", (req, res) => {
  const { username, password } = req.body;

  if (username === "admin" && password === "1234") {
    res.json({ success: true });
  } else {
    res.status(401).json({ success: false });
  }
});

// 🔥 ADD
app.post("/add", async (req, res) => {
  try {
    const { title, content } = req.body;

    if (!title || !content) {
      return res.status(400).json({ message: "Fields required ❌" });
    }

    const newNotice = new Notice({ title, content });
    await newNotice.save();

    res.json({ message: "Added ✅" });
  } catch (err) {
    console.log("ADD ERROR 👉", err);
    res.status(500).send("Server Error ❌");
  }
});

// 🔥 VIEW (PIN FIRST)
app.get("/view", async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = 5;

    const skip = (page - 1) * limit;

    const total = await Notice.countDocuments();

    const data = await Notice.find()
      .sort({ pinned: -1, createdAt: -1 }) // 🔥 PIN FIRST
      .skip(skip)
      .limit(limit);

    res.json({
      total,
      page,
      pages: Math.ceil(total / limit),
      data
    });
  } catch (err) {
    console.log("VIEW ERROR 👉", err);
    res.status(500).send("Server Error ❌");
  }
});

// 🔥 PIN TOGGLE (FULL FIX 🔥)
app.put("/pin/:id", async (req, res) => {
  try {
    const notice = await Notice.findById(req.params.id);

    // ❗ important check
    if (!notice) {
      return res.status(404).send("Notice not found ❌");
    }

    notice.pinned = !notice.pinned;
    await notice.save();

    res.send("Pin Updated 📌");
  } catch (err) {
    console.log("PIN ERROR 👉", err);
    res.status(500).send("Server Error ❌");
  }
});

// 🔥 DELETE
app.delete("/delete/:id", async (req, res) => {
  try {
    await Notice.findByIdAndDelete(req.params.id);
    res.send("Deleted ✅");
  } catch (err) {
    console.log("DELETE ERROR 👉", err);
    res.status(500).send("Server Error ❌");
  }
});

// 🔥 UPDATE
app.put("/update/:id", async (req, res) => {
  try {
    const { title, content } = req.body;

    await Notice.findByIdAndUpdate(req.params.id, {
      title,
      content
    });

    res.send("Updated ✏");
  } catch (err) {
    console.log("UPDATE ERROR 👉", err);
    res.status(500).send("Server Error ❌");
  }
});

// 🔥 SERVER
app.listen(5000, () => {
  console.log("Server running 🚀");
});