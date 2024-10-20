export interface Car {
  id: string;
  brand: string;
  model: string;
  typeFuel: string;
  licensePlate: string;
  lastOilChange: Date;
  oilChangeIntervalKm: number; //stała licza km do kolejnej wymiany oleju. Stała (15000km)
  oilType: string;
  averageKmPerYear: number;
  currentMilleage: number;
  milleageUnit: string;
  reminderBeforeChange: number;
}
