import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { createServer as createViteServer } from "vite";
import dotenv from "dotenv";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Routes
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", timestamp: new Date().toISOString() });
  });

  // Mock search / knowledge base API (can be expanded later with Elasticsearch or dense retrieval)
  app.get("/api/search", (req, res) => {
    const { q } = req.query;
    // Simulated semantic search
    res.json({
      results: [
        { title: "Property Tax Payment", snippet: "Citizens can pay property tax through the BBMP portal..." },
        { title: "BESCOM Bill Payment", snippet: "Electricity bills can be paid online via the BESCOM website or mobile app..." }
      ]
    });
  });

  // File uploads (local fallback if Firebase Storage not used)
  app.post("/api/documents/upload", (req, res) => {
     res.json({ message: "Document uploaded successfully", id: "doc_" + Date.now() });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
