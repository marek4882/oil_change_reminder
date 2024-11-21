import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const authorizationHeader = req.header("Authorization");

  if (!authorizationHeader || !authorizationHeader.startsWith("Bearer ")) {
    res
      .status(401)
      .json({ success: false, message: "Invalid authorization header" });
    return;
  }

  const token = authorizationHeader.replace("Bearer ", "");
  if (!token) {
    res
      .status(401)
      .json({ success: false, message: "Authorization token not found" });
    return;
  }

  try {
    if (typeof process.env.SECRET_KEY !== "string") {
      throw new Error("SECRET_KEY is not set in environment variables");
    }
    const decoded = verify(token, process.env.SECRET_KEY);
    if (typeof decoded !== "string") res.locals.user = decoded;
    console.log(typeof decoded);
    next();
  } catch (err) {
    console.error(err);
    res.status(401).json({ success: false, message: "Invalid token" });
  }
};

export default authMiddleware;
