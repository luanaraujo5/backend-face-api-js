import { config } from "dotenv";
config();

import http from "http";
import app from "./app.js";

const PORT = Number(process.env.PORT || 3000);
const server = http.createServer(app);

server.listen(PORT, () => {
  console.log(`✅ Backend (TS) rodando em http://localhost:${PORT}`);
});
