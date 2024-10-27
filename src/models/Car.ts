export type TypeFuel = "Petrol" | "Diesel" | "Electric" | "Hybrid";
export type Viscosity = "5W-30" | "10W-40" | "0W-20";
export type OilType = "Synthetic" | "Conventional" | "Blend";
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
}
