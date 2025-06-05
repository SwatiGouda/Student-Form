const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname))); // Serve static files (HTML, JS, CSS)

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/loginFormDB');


// Mongoose model
const formSubmissionSchema = new mongoose.Schema({
  fullName: String,
  dob: String,
  qualification: String,
  message: String,
});
const FormSubmission = mongoose.model("FormSubmission", formSubmissionSchema);

// API to get all submissions
app.get("/submissions", async (req, res) => {
  try {
    const data = await FormSubmission.find().sort({ _id: -1 });
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch submissions" });
  }
});

// API to receive new submissions
app.post("/api/users", async (req, res) => {
  try {
    const { fullName, dob, qualification, message } = req.body;
    const newSubmission = new FormSubmission({
      fullName,
      dob,
      qualification,
      message,
    });
    await newSubmission.save();
    res.status(201).json({ message: "Submission saved!" });
  } catch (err) {
    res.status(500).json({ message: "Failed to save submission" });
  }
});

// Fallback to index.html for SPA routing (optional)
// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, 'index.html'));
// });

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:3000}`);
});