export type TypeFuel = "Petrol" | "Diesel" | "Electric" | "Hybrid";
export type Viscosity = "0W-20" | "5W-30" | "10W-40" | "15W-40" | "20W-50";
export type OilType =
  | "Synthetic"
  | "Semi-synthetic"
  | "Mineral"
  | "Diesel-special"
  | "Hybrid-special"
  | "Conventional"
  | "Electric-coolant"
  | "Blend";
export type MilleageUnit = "Km" | "Mi";

export interface Car {
  id: string;
  brand: string;
  model: string;
  typeFuel: TypeFuel;
  licensePlate: string;
  lastOilChange: Date;
  oilChangeIntervalKm: number;
  oilType: OilType;
  viscosity: Viscosity;
  averageKmPerYear: number;
  currentMilleage: number;
  milleageUnit: MilleageUnit;
  reminderBeforeChange: number;
  nextOilChangeDate?: Date;
}
