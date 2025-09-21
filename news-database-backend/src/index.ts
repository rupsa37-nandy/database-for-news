import dotenv from "dotenv";
import apps from "./app";
import { connectDB } from "./config/dataSource";

dotenv.config();

const PORT = process.env.PORT || 3000;

const connection = async () => {
  try {
    // connect to MongoDB
    await connectDB();
    // start server only if DB connection succeeds
    apps.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Failed to connect to database:", error);
  }
};

connection();