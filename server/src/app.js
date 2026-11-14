import express from "express";
import cors from "cors";

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Test route
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Todo API is running successfully!",
  });
});

export default app;