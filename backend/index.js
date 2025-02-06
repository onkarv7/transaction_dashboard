const express = require("express");
const mongoose = require("mongoose");
const transactionRoutes = require("./routes/transactionRoutes");
const cors = require("cors");
require("dotenv").config();

const app = express();

// Middleware setup
app.use(express.json());
app.use(cors());

// Routes
app.use("/api", transactionRoutes);

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    // useNewUrlParser: true,
    // useUnifiedTopology: true,
  })
  .then(() => console.log("Database connected"))
  .catch((error) => console.error("Database connection error:", error));

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
