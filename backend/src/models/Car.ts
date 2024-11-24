import mongoose, { Schema, Document } from "mongoose";
import { OIL_CHANGE_INTERVAL_KM } from "./Constant";

const fuelTypes = ["Petrol", "Diesel", "Electric", "Hybrid"] as const;
const viscosity = ["0W-20", "5W-30", "10W-40", "15W-40", "20W-50"] as const;
const oilTypes = [
  "Synthetic",
  "Semi-synthetic",
  "Mineral",
  "Diesel-special",
  "Hybrid-special",
  "Conventional",
  "Electric-coolant",
  "Blend",
] as const;
const mileageUnits = ["Km", "Mi"] as const;

// Define additional types
export type FuelType = (typeof fuelTypes)[number];
export type Viscosity = (typeof viscosity)[number];
export type OilType = (typeof oilTypes)[number];
export type MileageUnit = (typeof mileageUnits)[number];

export interface IOilChangeRecord {
  date: Date;
  oilType: OilType;
  viscosity: Viscosity;
  mileage: number;
}

// Define the TypeScript interface for the car
export interface Car extends Document {
  brand: string;
  carModel: string;
  typeFuel: FuelType;
  licensePlate: string;
  lastOilChange: Date;
  oilChangeIntervalKm: number;
  oilType: OilType;
  viscosity: Viscosity;
  averageKmPerYear: number;
  currentMilleage: number;
  mileageUnit: MileageUnit;
  carOwnerId: mongoose.Types.ObjectId; // Reference to the User
  nextOilChangeDate?: Date;
  oilChangeHistory?: IOilChangeRecord[];
}

// Create the OilChangeRecord schema
const OilChangeRecordSchema: Schema = new Schema({
  date: { type: Date, required: true },
  oilType: {
    type: String,
    enum: oilTypes,
    required: true,
  },
  viscosity: { type: String, enum: viscosity, required: true },
  mileage: { type: Number, required: true },
});
// Create the Car schema
const CarSchema: Schema = new Schema({
  brand: { type: String, required: true },
  carModel: { type: String, required: true },
  typeFuel: {
    type: String,
    enum: fuelTypes,
    required: true,
  },
  licensePlate: { type: String, required: true, unique: true },
  lastOilChange: { type: Date, required: true },
  oilChangeIntervalKm: { type: Number, required: false },
  oilType: {
    type: String,
    enum: oilTypes,
    required: true,
  },
  viscosity: {
    type: String,
    enum: viscosity,
    required: true,
  },
  averageKmPerYear: { type: Number },
  currentMilleage: { type: Number, required: true },
  mileageUnit: { type: String, enum: mileageUnits, required: true },
  carOwnerId: { type: mongoose.Types.ObjectId, ref: "User", required: true }, // Reference to the User model
  nextOilChangeDate: { type: Date },
  oilChangeHistory: [OilChangeRecordSchema], // Array of oil change records
});

// Create and export the Mongoose model
export const CarModel = mongoose.model<Car>("Car", CarSchema);
