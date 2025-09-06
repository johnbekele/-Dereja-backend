// server.js
import express from "express";
import { fileURLToPath } from "url";
import { dirname } from "path";
import cors from "cors";
import dotenv from "dotenv";
import http from "http";
import { Server } from "socket.io";
import morgan from "morgan";
import connectDB from "./src/config/dbConfig.js";
import configureSocket from "./src/config/socket.js";
import { setupUploadDirectory } from "./src/utils/fileUtils.js";
import bodyParser from "body-parser";
import passport from "passport";
import configurePassport from "./src/config/passportConfig.js";
import errorHandler from "./src/middleware/errorHandler.js";


// Routes
import testRoutes from "./src/test/testRoute.js";
import authRoutes from "./src/routes/Auth.js";

dotenv.config();

const isDevelopment = process.env.NODE_ENV !== 'production';
const port = process.env.PORT || 3000;

const app = express();
const server = http.createServer(app);
const io = configureSocket(server);

const startServer = async () => {
  try {
    if (isDevelopment) {
      console.log('Running in development mode');
    } else {
      console.log('Running in production mode');
    }
    await connectDB();
    // await vectorDb.createIndex();

    const __filename = fileURLToPath(import.meta.url);
    const __dirname = dirname(__filename);

    // Setup upload directory
    setupUploadDirectory(__dirname);

    app.use(cors({
      origin: isDevelopment
        ? ['http://127.0.0.1:5173', 'http://localhost:5173']
        : [
            'https://domain.com',
            'http://localhost:5173',
            'http://127.0.0.1:5173',
            'https://domain.app',
          ],
      credentials: true,
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
      allowedHeaders: ['Content-Type', 'Authorization'],
    }));

    if (!isDevelopment) {
      app.use((req, res, next) => {
        res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
        res.setHeader('X-Content-Type-Options', 'nosniff');
        res.setHeader('X-Frame-Options', 'DENY');
        res.setHeader('X-XSS-Protection', '1; mode=block');
        next();
      });
    }

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(passport.initialize());
    app.set('io', io);
    configurePassport();


    // Routes
    app.use("/api/test", testRoutes);
    app.use("/api/oauth", authRoutes);


    if (isDevelopment) {
      app.use(morgan('dev'));
    } else {
      app.use(morgan('combined'));
    }
  

    // Error handling middleware
    app.use(errorHandler);
    app.use((err, req, res, next) => {
      console.error(err.stack);
      res.status(500).json({ message: 'Internal Server Error' });
    });

   server.listen(port,"0.0.0.0", () => {
      console.log(`Server running on port ${port}`);
    });
  } catch (error) {
    console.error('Server startup failed:', error);
    process.exit(1);
  }
};

startServer();