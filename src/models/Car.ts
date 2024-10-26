export interface Car {
  id: string;
  brand: string;
  model: string;
  typeFuel: string;
  licensePlate: string;
  lastOilChange: Date;
  oilChangeIntervalKm: number;
  oilType: string;
  averageKmPerYear: number;
  currentMilleage: number;
  milleageUnit: string;
  reminderBeforeChange: number;
}
