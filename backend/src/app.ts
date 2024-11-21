import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import connectDB from "./config/db";
import routes from "./routes/index";
import auth from "./routes/auth";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5002;

app.use(cors());
app.use(express.json());

// Połączenie z bazą danych
connectDB();

// Routing
app.use("/auth", auth);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
