import { Router } from "express";
import { CarModel } from "../models/Car";
import { verifyJWTMiddleware } from "../middleware/authenticateToken";

const router = Router();

// Get cars for the logged-in user
router.get("/cars", verifyJWTMiddleware, async (req, res) => {
  try {
    const userId = req.user.id;

    const userCars = await CarModel.find({ carOwnerId: userId });

    res.status(200).json(userCars);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching cars" });
  }
});

export default router;
