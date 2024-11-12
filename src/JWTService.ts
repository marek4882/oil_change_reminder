import jwt from "jsonwebtoken";

interface JwtPayload {
  id: string;
}

export class JWTService {
  static generateToken(user: { id: string }) {
    return jwt.sign({ id: user.id }, SECRET_KEY, { expiresIn: "1h" });
  }

  static generateRefreshToken(user: { id: string }) {
    return jwt.sign({ id: user.id }, REFRESH_SECRET_KEY, { expiresIn: "7d" });
  }

  static verifyToken(token: string): JwtPayload | null {
    try {
      return jwt.verify(token, SECRET_KEY) as JwtPayload;
    } catch (error) {
      console.error("Error verifying token", error);
      return null;
    }
  }

  static verifyRefreshToken(token: string): JwtPayload | null {
    try {
      return jwt.verify(token, REFRESH_SECRET_KEY) as JwtPayload;
    } catch (error) {
      console.error("Error verifying refresh token", error);
      return null;
    }
  }
}
