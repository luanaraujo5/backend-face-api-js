import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import peopleRoutes from "./routes/people.routes.js";
import { notFound } from "./middlewares/notFound.js";
import { errorHandler } from "./middlewares/error.js";
import "./config/db.js"; // inicializa DB/migrations no import

const app = express();

const origins = (process.env.CORS_ORIGIN || "").split(",").filter(Boolean);
app.use(cors({ origin: origins.length ? origins : true }));

app.use(helmet());
app.use(morgan("dev"));
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: false }));

app.get("/health", (_req, res) => res.json({ ok: true }));

app.use("/api", peopleRoutes);

app.use(notFound);
app.use(errorHandler);

export default app;
