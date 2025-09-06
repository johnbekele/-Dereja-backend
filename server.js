// server.js
import express from "express";
import { fileURLToPath } from "url";
import { dirname } from "path";
import cors from "cors";
import dotenv from "dotenv";
import http from "http";
import { Server } from "socket.io";
import morgan from "morgan";

dotenv.config();

const isDevelopment = process.env.NODE_ENV !== "production";
const port = process.env.PORT || 3000;

const app = express();

if (isDevelopment) {
app.use(morgan("dev"));
}else{
  app.use(morgan("combined"));
}
// Middleware to get __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Create HTTP server and integrate with Socket.IO
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: isDevelopment
      ? ["http://127.0.0.1:5173", "http://localhost:5173"]
      : ["https://your-production-domain.com"],
    credentials: true,
  },
});




app.use(cors());
app.use(express.json());


app.get("/", (req, res) => {
  res.json({ message: "API is running 🚀" });
});


app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Internal Server Error" });
});

// Start server
server.listen(port, "0.0.0.0", () => {
  console.log(`✅ Server running on port ${port}`);
});
