import jwt from "jsonwebtoken";

export const generateToken = (user: { id: string }): string | null => {
  const secretKey = process.env.SECRET_KEY;
  if (typeof secretKey !== "string") {
    console.error("Secret key is not set");
    return null;
  }
  return jwt.sign({ id: user.id }, secretKey, {
    expiresIn: "1h",
  });
};

export const generateRefreshToken = (user: { id: string }): string | null => {
  const refreshSecretKey = process.env.REFRESH_SECRET_KEY;
  if (typeof refreshSecretKey !== "string") {
    console.error("Secret key is not set");
    return null;
  }
  return jwt.sign({ id: user.id }, refreshSecretKey, {
    expiresIn: "7d",
  });
};

export const verifyToken = (token: string) => {
  const secretKey = process.env.SECRET_KEY;
  if (typeof secretKey !== "string") {
    console.error("Secret key is not set");
    return null;
  }
  try {
    return jwt.verify(token, secretKey);
  } catch (error) {
    console.error("Failed to verify token", error);
    return null;
  }
};

export const verifyRefreshToken = (token: string) => {
  const refreshSecretKey = process.env.REFRESH_SECRET_KEY;
  if (typeof refreshSecretKey !== "string") {
    console.error("Secret key is not set");
    return null;
  }
  return jwt.verify(token, refreshSecretKey);
};
