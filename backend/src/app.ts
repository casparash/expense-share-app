import express from "express";
import cors from "cors";

import healthRoutes from "./routes/health.routes";
import usersRoutes from "./routes/users.routes";
import groupRoutes from "./routes/groups.routes";
import expensesRoutes from "./routes/expenses.routes";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/health", healthRoutes);
app.use("/users", usersRoutes);
app.use("/groups", groupRoutes);
app.use("/expenses", expensesRoutes);

export default app;
