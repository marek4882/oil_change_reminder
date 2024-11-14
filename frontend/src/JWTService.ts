import jwt from "jsonwebtoken";

export class JWTService {
  static generateToken(user: { id: string }) {
    return jwt.sign({ id: user.id }, process.env.SECRET_KEY!, {
      expiresIn: "1h",
    });
  }

  static generateRefreshToken(user: { id: string }) {
    return jwt.sign({ id: user.id }, process.env.REFRESH_SECRET_KEY!, {
      expiresIn: "7d",
    });
  }

  static verifyToken(token: string) {
    try {
      return jwt.verify(token, process.env.SECRET_KEY!);
    } catch (error) {
      console.error("Error verifying token", error);
      return null;
    }
  }

  static verifyRefreshToken(token: string) {
    try {
      return jwt.verify(token, process.env.REFRESH_SECRET_KEY!);
    } catch (error) {
      console.error("Error verifying refresh token", error);
      return null;
    }
  }
}
