import { Repository } from "../api/ApiService";
import { Car } from "../models/Car";
import { v4 as uuid } from "uuid";

export class CarManager {
  private repository: Repository;
  constructor(repository: Repository) {
    this.repository = repository;
  }

  //   Car Methods
  // Add
  public addCar(brand: string): void {
    const cars = this.repository.readCars();
    const car: Car = {
      id: uuid(),
      brand,
      model: "",
      typeFuel: "",
      licensePlate: "",
      lastOilChange: undefined,
      oilChangeIntervalKm: 0,
      oilType: "",
      averageKmPerYear: 0,
      currentMilleage: 0,
      milleageUnit: "",
      reminderBeforeChange: 0,
    };
  }
}
