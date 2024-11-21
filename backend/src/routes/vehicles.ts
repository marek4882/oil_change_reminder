import { Router, Request, Response } from "express";
import authMiddleware from "../middleware/authMiddleware"; // Twój middleware
import { CarModel } from "../models/Car"; // Twój model samochodu

// Tworzymy instancję routera
const router = Router();

// Endpoint do pobrania samochodów zalogowanego użytkownika
router.get("/vehicles", authMiddleware, async (req: Request, res: Response) => {
  try {
    // Pobieramy ID użytkownika z req.user (ustawione w middleware)
    const userId = res.locals.user.id;

    // Wyszukujemy samochody przypisane do zalogowanego użytkownika
    const userCars = await CarModel.find({ carOwnerId: userId });

    // Zwracamy listę samochodów
    res.status(200).json({ success: true, vehicles: userCars });
  } catch (error) {
    console.error("Error fetching vehicles:", error);
    res
      .status(500)
      .json({ success: false, message: "Failed to fetch vehicles" });
  }
});

//Dodanie nowego samochodu

router.post(
  "/crudformpage",
  authMiddleware,
  async (req: Request, res: Response) => {
    console.log("Request Body:", req.body);
    try {
      const {
        brand,
        carModel,
        typeFuel,
        licensePlate,
        lastOilChange,
        oilChangeIntervalKm,
        oilType,
        viscosity,
        averageKmPerYear,
        currentMilleage,
        mileageUnit,
        nextOilChangeDate,
        oilChangeHistory,
      } = req.body;

      const userId = res.locals.user.id;
      if (!userId) {
        res.status(400).json({ success: false, message: "User ID not found" });
        return;
      }

      const newCar = new CarModel({
        brand,
        carModel,
        typeFuel,
        licensePlate,
        lastOilChange,
        oilChangeIntervalKm,
        oilType,
        viscosity,
        averageKmPerYear,
        currentMilleage,
        mileageUnit,
        nextOilChangeDate,
        oilChangeHistory,
        carOwnerId: userId,
      });

      await newCar.save();

      res.status(201).json({ success: true, car: newCar });
    } catch (error) {
      console.error("Error adding car:", error);
      res.status(500).json({ success: false, message: "Failed to add car" });
    }
  }
);

// Update a car by ID

router.put(
  "/crudformpage/:carId",
  authMiddleware,
  async (req: Request, res: Response) => {
    try {
      const carId = req.params.id;
      const userId = res.locals.user.id;

      const {
        brand,
        carModel,
        typeFuel,
        licensePlate,
        lastOilChange,
        oilChangeIntervalKm,
        oilType,
        viscosity,
        averageKmPerYear,
        currentMilleage,
        milleageUnit,
        nextOilChangeDate,
        oilChangeHistory,
      } = req.body;

      const updatedCar = await CarModel.findOneAndUpdate(
        { _id: carId, carOwnerId: userId },
        {
          brand,
          carModel,
          typeFuel,
          licensePlate,
          lastOilChange,
          oilChangeIntervalKm,
          oilType,
          viscosity,
          averageKmPerYear,
          currentMilleage,
          mileageUnit: milleageUnit,
          nextOilChangeDate,
          oilChangeHistory,
        },
        { new: true }
      );

      if (!updatedCar) {
        res.status(500).json({ success: false, message: "Car not found" });
        return;
      }

      res.status(200).json({ success: true, car: updatedCar });
    } catch (error) {
      console.error("Error fetching vehicles:", error);
      res.status(500).json({ success: false, car: "Failed to update car" });
    }
  }
);

export default router;
