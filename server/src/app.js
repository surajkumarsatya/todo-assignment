import express from "express";
import cors from "cors";

import taskRoutes from "./routes/taskRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Todo API is running successfully!",
  });
});

app.use("/api/tasks", taskRoutes);

export default app;
