import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import { JWTService } from "../JWTService";
import { mockUser } from "../models/User";

dotenv.config();
const app = express();
const PORT = 5176;

app.use(bodyParser.json());

// Login route
app.post("/signin", (req, res) => {
  const { email, password } = req.body;
  const user = mockUser.find(
    (user) => user.email === email && user.password === password
  );

  if (user) {
    const token = JWTService.generateToken({ id: user.id });
    const refreshToken = JWTService.generateRefreshToken({ id: user.id });
    res.json({ token, refreshToken });
  } else {
    res.status(401).json({ error: "Invalid credentials" });
  }
});

app.post("/refresh-token", (req, res) => {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    return res.status(400).json({ error: "Refresh token is required" });
  }

  // Verify and decode refresh token
  const decoded = JWTService.verifyRefreshToken(refreshToken);

  // Type guard to ensure decoded is of the correct type
  if (decoded && typeof decoded !== "string" && "id" in decoded) {
    const newToken = JWTService.generateToken({ id: decoded.id });
    res.json({ token: newToken });
  } else {
    res.status(403).json({ error: "Invalid or expired refresh token" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
