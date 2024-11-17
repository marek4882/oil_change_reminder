import { Request, Response, Router } from "express";
import bcrypt from "bcryptjs";
import { UserModel } from "../models/User";
import { z } from "zod";
import { generateRefreshToken, generateToken } from "../services/JWTService";

const router = Router();

const signUpSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  password: z.string().min(8),
});

router.post("/signup", async (req: Request, res: Response) => {
  const { data, error } = signUpSchema.safeParse(req.body);

  if (error) {
    console.error(error);
    res.status(400).json({ message: "Invalid request" });
    return;
  }

  try {
    const existingUser = await UserModel.findOne({ email: data.email });
    if (existingUser) {
      res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);

    const newUser = new UserModel({
      name: data.name,
      email: data.email,
      password: hashedPassword,
    });
    await newUser.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Error during user registration:", error);
    res.status(500).json({ message: "Server error" });
  }
});

const signInSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

router.post("/signin", async (req: Request, res: Response) => {
  const { data, error } = signInSchema.safeParse(req.body);

  if (error) {
    res.status(400).json({ message: "Invalid request" });
    return;
  }

  try {
    const user = await UserModel.findOne({ email: data.email });

    if (!user) {
      res.status(401).json({ message: "User not found" });
      return;
    }

    if (!(await bcrypt.compare(data.password, user.password))) {
      res.status(401).json({ message: "Invalid credentials" });
      return;
    }

    const accessToken = generateToken({ id: user.id });
    const refreshToken = generateRefreshToken({
      id: user.id,
    });
    res.status(200).json({
      message: "Signin successful",
      accessToken,
      refreshToken,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Error during user signin:", error);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
