import { Router, Request, Response } from "express";
import authMiddleware from "../middleware/authMiddleware"; // Twój middleware
import { CarModel } from "../models/Car"; // Twój model samochodu
import mongoose from "mongoose";
import { OIL_CHANGE_INTERVAL_KM } from "../models/Constant";

// Tworzymy instancję routera
const router = Router();

router.use(authMiddleware);

const calculateNextOilChangeDate = (
  averageKmPerYear: number,
  lastOilChange: Date
): Date => {
  // Oblicz liczbę miesięcy do kolejnej wymiany
  const monthsUntilNextChange =
    (OIL_CHANGE_INTERVAL_KM / averageKmPerYear) * 12;

  // Stwórz kopię daty ostatniej wymiany, aby dodać liczbę miesięcy
  const nextOilChangeDate = new Date(lastOilChange);
  nextOilChangeDate.setMonth(
    nextOilChangeDate.getMonth() + monthsUntilNextChange
  );

  // Sprawdź, czy data następnej wymiany przekracza 1 rok
  const oneYearLater = new Date(lastOilChange);
  oneYearLater.setFullYear(oneYearLater.getFullYear() + 1);

  // Jeśli następna data wymiany jest większa niż rok od ostatniej, ustaw na rok później
  if (nextOilChangeDate > oneYearLater) {
    return oneYearLater;
  }
  return nextOilChangeDate;
};

// GET /vehicles
router.get("/", async (req: Request, res: Response) => {
  try {
    const userId = res.locals.user.id;

    const userCars = await CarModel.find({ carOwnerId: userId });

    res.status(200).json({ success: true, vehicles: userCars });
  } catch (error) {
    console.error("Error fetching vehicles:", error);
    res
      .status(500)
      .json({ success: false, message: "Failed to fetch vehicles" });
  }
});

// POST /vehicles
router.post("/", async (req: Request, res: Response) => {
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
    } = req.body;

    const userId = res.locals.user.id;
    console.log("User ID:", userId); // Verify the user ID is being passed

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
      oilChangeHistory: [
        {
          date: lastOilChange,
          oilType: oilType,
          viscosity: viscosity,
          mileage: currentMilleage,
        },
      ],
      carOwnerId: userId,
    });

    // Calculate and set the nextOilChangeDate
    newCar.nextOilChangeDate = calculateNextOilChangeDate(
      newCar.averageKmPerYear,
      newCar.lastOilChange
    );

    // Save the car with the calculated nextOilChangeDate
    const savedCar = await newCar.save();
    console.log("Saved Car Data:", savedCar); // Log saved car data

    res.status(201).json({ success: true, car: savedCar });
  } catch (error) {
    console.error("Error adding car:", error);
    res.status(500).json({ success: false, message: "Failed to add car" });
  }
});

// PUT /vehicles/:carId
router.put("/:carId", async (req: Request, res: Response) => {
  try {
    const { carId } = req.params;
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
      mileageUnit,
    } = req.body;

    // Pobierz samochód z bazy danych
    const car = await CarModel.findOne({ _id: carId, carOwnerId: userId });

    if (!car) {
      res.status(404).json({ success: false, message: "Car not found" });
      return;
    }

    // Zaktualizuj dane samochodu
    car.brand = brand;
    car.carModel = carModel;
    car.typeFuel = typeFuel;
    car.licensePlate = licensePlate;
    car.lastOilChange = lastOilChange;
    car.oilChangeIntervalKm = oilChangeIntervalKm;
    car.oilType = oilType;
    car.viscosity = viscosity;
    car.averageKmPerYear = averageKmPerYear;
    car.currentMilleage = currentMilleage;
    car.mileageUnit = mileageUnit;

    // Wywołaj metodę do obliczenia daty następnej wymiany oleju
    car.nextOilChangeDate = calculateNextOilChangeDate(
      averageKmPerYear,
      lastOilChange
    );

    // Zapisz zaktualizowany samochód w bazie
    const updatedCar = await car.save();

    res.status(200).json({ success: true, car: updatedCar });
  } catch (error) {
    console.error("Error updating car:", error);
    res.status(500).json({ success: false, message: "Failed to update car" });
  }
});

// Delete a car by ID
// DELETE /vehicles/:carId
router.delete("/:carId", async (req: Request, res: Response) => {
  try {
    const { carId } = req.params; // Extract the car ID from the request parameters
    const userId = res.locals.user.id; // Extract the authenticated user's ID

    // Find and delete the car that matches the ID and belongs to the logged-in user
    const deletedCar = await CarModel.findOneAndDelete({
      _id: carId,
      carOwnerId: userId,
    });

    if (!deletedCar) {
      // If no car was found, return a 404 response
      res.status(404).json({ success: false, message: "Car not found" });
      return;
    }

    // Respond with success if the car was deleted
    res
      .status(200)
      .json({ success: true, message: "Car deleted successfully" });
  } catch (error) {
    console.error("Error deleting car:", error);
    // Handle errors and respond with a 500 status code
    res.status(500).json({ success: false, message: "Failed to delete car" });
  }
});

// GET a car by ID
// GET /vehicles/:carId
router.get("/:carId", async (req: Request, res: Response) => {
  try {
    const { carId } = req.params; // Extract the carId from the URL parameters
    const userId = res.locals.user.id; // Get the user ID from authentication middleware

    // Find the car by ID and check if it belongs to the authenticated user
    const car = await CarModel.findOne({ _id: carId, carOwnerId: userId });

    if (!car) {
      res.status(404).json({ success: false, message: "Car not found" });
      return;
    }

    // If the car is found, return it
    res.status(200).json({ success: true, car });
  } catch (error) {
    console.error("Error fetching car by ID:", error);
    res
      .status(500)
      .json({ success: false, message: "Failed to fetch car by ID" });
  }
});

// Post a next oil change
// vehicle

router.put("/oil/:carId", async (req: Request, res: Response) => {
  try {
    const { carId } = req.params;
    const { date, oilType, viscosity, mileage } = req.body;

    // Validate the required fields
    if (!date || !oilType || !viscosity || !mileage) {
      res.status(400).json({
        success: false,
        message: "Date, oilType, viscosity, and mileage are required.",
      });
      return;
    }

    // Validate the date
    const validDate = new Date(date);
    if (isNaN(validDate.getTime())) {
      res
        .status(400)
        .json({ success: false, message: "Invalid date provided" });
      return;
    }

    // Find the car by ID
    const car = await CarModel.findById(carId);
    if (!car) {
      res.status(404).json({ success: false, message: "Car not found" });
      return;
    }

    // Create a new oil change record
    const newOilChangeRecord = {
      date: validDate,
      oilType,
      viscosity,
      mileage,
    };

    // Calculate the next oil change date based on car data
    const nextOilChangeDate = calculateNextOilChangeDate(
      car.averageKmPerYear,
      validDate
    );

    // Prepare the update fields dynamically
    const updateFields = {
      lastOilChange: validDate,
      currentMilleage: mileage,
      oilType,
      viscosity,
      nextOilChangeDate,
      $push: { oilChangeHistory: newOilChangeRecord },
    };

    // Update the car document
    const updatedCar = await CarModel.findByIdAndUpdate(
      carId,
      { $set: updateFields, $push: { oilChangeHistory: newOilChangeRecord } },
      { new: true, runValidators: true } // Ensure validation is run on the updated data
    );

    if (!updatedCar) {
      res
        .status(404)
        .json({ success: false, message: "Car not found after update" });
      return;
    }

    // Respond with the updated car data
    res.status(200).json({ success: true, car: updatedCar });
  } catch (error) {
    console.error("Error adding oil change:", error);

    if (error instanceof mongoose.Error.ValidationError) {
      res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: error.errors,
      });
      return;
    }

    res
      .status(500)
      .json({ success: false, message: "Failed to add oil change" });
  }
});

export default router;
