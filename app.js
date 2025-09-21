// app.js
const express = require("express");
const bodyParser = require("body-parser");
const methodOverride = require("method-override");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();

// -----------------
// MongoDB Connection
// -----------------
const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/officeDB";

mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ Connected to MongoDB -> officeDB"))
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err);
    process.exit(1); // stop app if DB connection fails
  });

// -----------------
// Middleware
// -----------------
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));
app.use(methodOverride("_method")); // For PUT & DELETE in forms

// -----------------
// View Engine
// -----------------
app.set("view engine", "ejs");

// -----------------
// Routes
// -----------------
const departmentRoutes = require("./routes/departmentRoutes");
const employeeRoutes = require("./routes/employeeRoutes");

app.use("/departments", departmentRoutes);
app.use("/employees", employeeRoutes);

// Home route
app.get("/", (req, res) => {
  res.redirect("/employees");
});

// -----------------
// 404 Handler
// -----------------
app.use((req, res, next) => {
  res.status(404).render("404", { title: "Page Not Found" });
});

// -----------------
// Global Error Handler (Production Safe)
// -----------------
app.use((err, req, res, next) => {
  console.error("💥 Server Error:", err.message); // Only log message, no stack trace
  // In production, you can also log to a file instead of console

  // If request expects JSON, send JSON
  if (req.xhr || req.headers.accept.indexOf("json") > -1) {
    return res.status(500).json({ error: "Something went wrong!" });
  }

  // Otherwise, render a friendly error page
  res.status(500).render("error", { title: "Server Error", message: "Something went wrong! Please try again later." });
});

// -----------------
// Start Server
// -----------------
const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`🚀 Server running on http://localhost:${PORT}`)
);
