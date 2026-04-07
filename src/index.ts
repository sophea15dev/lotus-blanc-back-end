// src/index.ts
import app from "./app";
import dotenv from "dotenv";

dotenv.config();

const BASE_PORT = Number(process.env.PORT || 8000);

const startServer = (port: number) => {
  const server = app.listen(port, () => {
    console.log(`🚀 Server running on http://localhost:${port}`);
    console.log(`📖 Docs available at http://localhost:${port}/api-docs`);
  });

  server.on("error", (err: any) => {
    if (err.code === "EADDRINUSE") {
      console.warn(`⚠️ Port ${port} in use, trying ${port + 1}...`);
      startServer(port + 1);
    } else {
      console.error("Server error:", err);
      process.exit(1);
    }
  });
};

startServer(BASE_PORT);