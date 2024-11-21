import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import connectDB from "./config/db";
import auth from "./routes/auth";
import vehicles from "./routes/vehicles";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5002;

app.use(cors());
app.use(express.json());

// Połączenie z bazą danych
connectDB();

// Routing
app.use("/auth", auth);
app.use("/vehicles", vehicles);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
