import { config } from "dotenv";
config();

import http from "http";
import app from "./app.js";

/**
 * Server configuration
 */
const PORT = Number(process.env.PORT || 3000);
const server = http.createServer(app);

/**
 * Start the HTTP server
 */
server.listen(PORT, () => {
  console.log(`✅ Backend (TS) rodando em http://localhost:${PORT}`);
  console.log(`📖 Documentação Swagger UI: http://localhost:${PORT}/docs/swagger`);
  console.log(`📖 Documentação Scalar UI: http://localhost:${PORT}/docs`);
});
