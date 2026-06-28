import express from "express";
import cors from "cors";

import healthRoutes from "./routes/health.routes";
import usersRoutes from "./routes/users.routes";

const app = express();

console.log("App loaded");

app.use(cors());
app.use(express.json());

app.use("/health", healthRoutes);
app.use("/users", usersRoutes);

export default app;
