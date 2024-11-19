import { Request, Response, NextFunction } from "express";
import { UserPayload, verifyToken } from "../services/JWTService";

// Middleware to verify JWT and extract user data
export const verifyJWTMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const token = req.headers["authorization"]?.split(" ")[1];

  if (!token) {
    res.status(401).json({ message: "Access token missing" });
    return; // Musisz zakończyć funkcję po wysłaniu odpowiedzi
  }

  const decoded = verifyToken(token);

  if (!decoded) {
    res.status(401).json({ message: "Failed to authenticate token" });
    return; // Również tutaj zakończ funkcję
  }

  req.user = decoded as UserPayload;
  next(); // Kontynuuj do następnego middleware/handlera
};
export default verifyJWTMiddleware;
