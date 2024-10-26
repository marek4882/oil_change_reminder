import { LocalRepository, Repository } from "../api/ApiService";
import { Car } from "../models/Car";
import { v4 as uuid } from "uuid";

export class CarManager {
  private repository: Repository;
  constructor(repository: Repository) {
    this.repository = repository;
  }

  //   Car Methods
  // Add
  public addCar(
    brand: string,
    model: string,
    typeFuel: string,
    licensePlate: string,
    lastOilChangeDate: Date,
    oilChangeIntervalKm: number,
    oilType: string,
    averageKmPerYear: number,
    currentMilleage: number,
    milleageUnit: string,
    reminderBeforeChange: number
  ): void {
    const cars = this.repository.readCars();
    const car: Car = {
      id: uuid(),
      brand,
      model,
      typeFuel,
      licensePlate,
      lastOilChange: new Date(),
      oilChangeIntervalKm,
      oilType,
      averageKmPerYear,
      currentMilleage,
      milleageUnit,
      reminderBeforeChange,
    };
    cars.push(car);
    this.repository.saveCars(cars);
  }

  public readCars(): Car[] {
    return this.repository.readCars();
  }

  public updateCar(
    id: string,
    newBrand: string,
    newTypeFuel: string,
    newLicensePlate: string,
    newLastOilChange: Date,
    newOilChangeIntervalKm: number,
    newOilType: string,
    newAverageKmPerYear: number,
    newCurrentMilleage: number,
    newMilleageUnit: string,
    newReminderBeforeChange: number
  ): boolean {
    const cars = this.repository.readCars();
    const index = cars.findIndex((car) => car.id === id);
    if (index !== -1) {
      cars[index].brand = newBrand;
      cars[index].typeFuel = newTypeFuel;
      cars[index].licensePlate = newLicensePlate;
      cars[index].lastOilChange = newLastOilChange;
      cars[index].oilChangeIntervalKm = newOilChangeIntervalKm;
      cars[index].oilType = newOilType;
      cars[index].averageKmPerYear = newAverageKmPerYear;
      cars[index].currentMilleage = newCurrentMilleage;
      cars[index].milleageUnit = newMilleageUnit;
      cars[index].reminderBeforeChange = newReminderBeforeChange;

      this.repository.saveCars(cars);
      return true;
    }
    return false;
  }

  public deleteCar(id: string): boolean {
    const cars = this.repository.readCars();
    const index = cars.findIndex((car) => car.id === id);

    if (index !== -1) {
      cars.splice(index, 1);
      this.repository.saveCars(cars);
      return true;
    }
    return false;
  }

  public setCurrentCar(id: string): void {
    this.repository.setCurrentCar(id);
  }

  public getCurrentCarId(): string | null {
    return this.repository.getCurrentCarId();
  }
}
