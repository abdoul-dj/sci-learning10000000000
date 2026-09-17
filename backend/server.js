import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import app from "./src/app.js";
import { connectDB } from "./src/config/db.js";
import { logger } from "./src/utils/logger.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, ".env") });

const PORT = process.env.PORT || 5000;

const start = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      logger.info(`Server running on http://localhost:${PORT}`);
    });
  } catch (err) {
    logger.error("Failed to start server");
    if (err?.message === "MONGODB_URI is not set") {
      logger.error("Set MONGODB_URI in backend/.env");
    } else {
      logger.error("Could not connect to MongoDB");
    }
    process.exit(1);
  }
};

start();
