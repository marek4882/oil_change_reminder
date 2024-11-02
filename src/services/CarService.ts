import { LocalRepository, Repository } from "../api/ApiService";
import { Car, MilleageUnit, OilType, TypeFuel, Viscosity } from "../models/Car";
import { v4 as uuid } from "uuid";
import { calculateNextOilChangeDate } from "./CalculateOilChange";

export class CarManager {
  private repository: Repository;

  constructor(repository: Repository) {
    this.repository = repository;
  }

  // Car Methods

  // Add
  public addCar(
    brand: string,
    model: string,
    typeFuel: TypeFuel,
    licensePlate: string,
    lastOilChangeDate: Date,
    oilChangeIntervalKm: number,
    oilType: OilType,
    viscosity: Viscosity,
    averageKmPerYear: number,
    currentMilleage: number,
    milleageUnit: MilleageUnit,
    reminderBeforeChange: number
  ): void {
    const cars = this.repository.readCars();
    const nextOilChangeDate = calculateNextOilChangeDate(
      lastOilChangeDate,
      averageKmPerYear,
      oilChangeIntervalKm
    );

    const car: Car = {
      id: uuid(),
      brand,
      model,
      typeFuel,
      licensePlate,
      lastOilChange: lastOilChangeDate,
      oilChangeIntervalKm,
      oilType,
      viscosity,
      averageKmPerYear,
      currentMilleage,
      milleageUnit,
      reminderBeforeChange,
      nextOilChangeDate, // dodajemy obliczoną datę
    };
    cars.push(car);
    this.repository.saveCars(cars);
  }

  public updateCar(
    id: string,
    newBrand: string,
    newModel: string,
    newTypeFuel: TypeFuel,
    newLicensePlate: string,
    newLastOilChange: Date,
    newOilChangeIntervalKm: number,
    newOilType: OilType,
    newViscosity: Viscosity,
    newAverageKmPerYear: number,
    newCurrentMilleage: number,
    newMilleageUnit: MilleageUnit,
    newReminderBeforeChange: number
  ): boolean {
    const cars = this.repository.readCars();
    const index = cars.findIndex((car) => car.id === id);

    if (index !== -1) {
      const nextOilChangeDate = calculateNextOilChangeDate(
        newLastOilChange,
        newAverageKmPerYear,
        newOilChangeIntervalKm
      );

      cars[index] = {
        ...cars[index],
        brand: newBrand,
        model: newModel,
        typeFuel: newTypeFuel,
        licensePlate: newLicensePlate,
        lastOilChange: newLastOilChange,
        oilChangeIntervalKm: newOilChangeIntervalKm,
        oilType: newOilType,
        viscosity: newViscosity,
        averageKmPerYear: newAverageKmPerYear,
        currentMilleage: newCurrentMilleage,
        milleageUnit: newMilleageUnit,
        reminderBeforeChange: newReminderBeforeChange,
        nextOilChangeDate, // zapisujemy nową datę wymiany
      };
      this.repository.saveCars(cars);
      return true;
    }
    return false;
  }

  public readCars(): Car[] {
    return this.repository.readCars();
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
