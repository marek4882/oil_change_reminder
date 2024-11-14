import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db";
import routes from "./routes/index";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5002;

app.use(express.json());

// Połączenie z bazą danych
connectDB();

// Routing
app.use("/api", routes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
