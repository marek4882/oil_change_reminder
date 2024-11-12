import express from "express";

import bodyParser from "body-parser";
import { mockUser } from "../models/User";
import { JWTService } from "../JWTService";
const app = express();
const PORT = 5177;

app.use(bodyParser.json());

app.post("/login", (req, res) => {
  const { login, password } = req.body;

  const user = mockUser.find(
    (user) => user.email === login && user.password === password
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
    return res.status(403).json({ error: "Refresh token is required" });
  }

  const decoded = JWTService.verifyRefreshToken(refreshToken);

  if (!decoded) {
    return res.status(403).json({ error: "Invalid or expired refresh token" });
  }

  const newToken = JWTService.generateToken({ id: decoded.id });
  res.json({ token: newToken });
});

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
