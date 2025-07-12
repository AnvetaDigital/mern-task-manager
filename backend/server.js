import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import router from "./routes/auth.js";
import taskRouters from "./routes/taskRoutes.js";
dotenv.config({ path: "../.env" });

const app = express();
const PORT = process.env.PORT;

connectDB();

app.use(express.json());

app.use("/api/auth", router);
app.use("/api/tasks", taskRouters);

app.get("/api/get", (req, res) => {
  res.send("Hello from express.js");
});

app.listen(PORT, () => {
  console.log(`server is running at: http://localhost:${PORT}`);
});
