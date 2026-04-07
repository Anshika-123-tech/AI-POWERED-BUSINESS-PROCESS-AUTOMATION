import "dotenv/config";
import express from "express";
import cors from "cors";

// ✅ IMPORT FULL ROUTER (IMPORTANT)
import demoRoutes, { handleDemo } from "./routes/demo";

export function createServer() {
  const app = express();

  // ✅ CORS (only once is enough)
  app.use(cors({
    origin: "*",
  }));

  // ✅ BODY PARSING (VERY IMPORTANT)
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // ✅ API ROUTES
  app.get("/api/ping", (_req, res) => {
    const ping = process.env.PING_MESSAGE ?? "ping";
    res.json({ message: ping });
  });

  app.get("/api/demo", handleDemo);

  // 🔥🔥 THIS WAS MISSING (MAIN ISSUE)
  app.use("/api", demoRoutes);

  return app;
}