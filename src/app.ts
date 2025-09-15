import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import swaggerUi from "swagger-ui-express";
import { apiReference } from "@scalar/express-api-reference";
import peopleRoutes from "./routes/people.routes.js";
import { notFound } from "./middlewares/notFound.js";
import { errorHandler } from "./middlewares/error.js";
import { specs } from "./config/swagger.js";
import "./config/db.js"; // inicializa DB/migrations no import

/**
 * Express application instance
 */
const app = express();

// CORS configuration
const origins = (process.env.CORS_ORIGIN || "").split(",").filter(Boolean);
app.use(cors({ origin: origins.length ? origins : true }));

// Security and logging middleware
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      ...helmet.contentSecurityPolicy.getDefaultDirectives(),
      "script-src": ["'self'", "'unsafe-inline'", "https://cdn.jsdelivr.net"],
      "style-src": ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
      "font-src": ["'self'", "https://fonts.gstatic.com"],
    },
  },
}));
app.use(morgan("dev"));
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: false }));

/**
 * @swagger
 * /health:
 *   get:
 *     summary: Health check endpoint
 *     tags: [Health]
 *     responses:
 *       200:
 *         description: API is healthy
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Health'
 */
app.get("/health", (_req, res) => res.json({ ok: true }));

// API routes
app.use("/api", peopleRoutes);

// Documentation routes
app.use("/docs/swagger", swaggerUi.serve, swaggerUi.setup(specs, {
  customSiteTitle: "Face Recognition API - Swagger UI",
  customCss: '.swagger-ui .topbar { display: none }'
}));

app.use("/docs", apiReference({
  theme: 'bluePlanet',
  spec: {
    content: specs
  }
} as any));

// 404 and error handling
app.use(notFound);
app.use(errorHandler);

export default app;
