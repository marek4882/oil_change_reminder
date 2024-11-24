import { Repository } from "../api/ApiService";
import { Car, MilleageUnit, OilType, TypeFuel, Viscosity } from "../models/Car";
import { calculateNextOilChangeDate } from "./CalculateOilChange";

export class CarManager {
  private repository: Repository;

  constructor(repository: Repository) {
    this.repository = repository;
  }

  // Car Methods

  // Add
  public addCar(
    carOwnerId: string,
    brand: string,
    carModel: string,
    typeFuel: TypeFuel,
    licensePlate: string,
    lastOilChangeDate: Date,
    oilChangeIntervalKm: number,
    oilType: OilType,
    viscosity: Viscosity,
    averageKmPerYear: number,
    currentMilleage: number,
    mileageUnit: MilleageUnit
  ): void {
    const cars = this.repository.readCars();
    const nextOilChangeDate = calculateNextOilChangeDate(
      lastOilChangeDate,
      averageKmPerYear,
      oilChangeIntervalKm
    );

    const car: Car = {
      carOwnerId,
      brand,
      carModel,
      typeFuel,
      licensePlate,
      lastOilChange: lastOilChangeDate,
      oilChangeIntervalKm,
      oilType,
      viscosity,
      averageKmPerYear,
      currentMilleage,
      mileageUnit,
      nextOilChangeDate,
      oilChangeHistory: [
        {
          date: lastOilChangeDate,
          oilType,
          mileage: currentMilleage,
          viscosity,
        },
      ],
    };
    cars.push(car);
    this.repository.saveCars(cars);
  }

  public addOilChange(
    carId: string,
    date: Date,
    oilType: OilType,
    mileage: number,
    viscosity: Viscosity
  ): boolean {
    const cars = this.repository.readCars();
    const car = cars.find((car) => car._id === carId);

    if (!car) {
      console.error(`Car with ID ${carId} not found`); // Log this
      return false;
    }

    car.oilChangeHistory = car.oilChangeHistory || [];
    car.oilChangeHistory.push({ date, oilType, mileage, viscosity });

    // Optionally, update last oil change details and next oil change date
    car.lastOilChange = date;
    car.currentMilleage = mileage;
    car.nextOilChangeDate = calculateNextOilChangeDate(
      date,
      car.averageKmPerYear,
      car.oilChangeIntervalKm
    );

    this.repository.saveCars(cars);
    return true;
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
    newMilleageUnit: MilleageUnit
  ): boolean {
    const cars = this.repository.readCars();
    const index = cars.findIndex((car) => car._id === id);

    if (index !== -1) {
      const car = cars[index];

      // Convert lastOilChange to Date object if necessary
      const lastOilChangeDate =
        car.lastOilChange instanceof Date
          ? car.lastOilChange
          : new Date(car.lastOilChange);

      // Check if there's a change in the oil change date
      const isOilChangeDateUpdated =
        lastOilChangeDate.getTime() !== newLastOilChange.getTime();

      // Calculate next oil change date based on the new date and parameters
      const nextOilChangeDate = calculateNextOilChangeDate(
        newLastOilChange,
        newAverageKmPerYear,
        newOilChangeIntervalKm
      );

      // Update the car details
      cars[index] = {
        ...car,
        brand: newBrand,
        carModel: newModel,
        typeFuel: newTypeFuel,
        licensePlate: newLicensePlate,
        lastOilChange: newLastOilChange,
        oilChangeIntervalKm: newOilChangeIntervalKm,
        oilType: newOilType,
        viscosity: newViscosity,
        averageKmPerYear: newAverageKmPerYear,
        currentMilleage: newCurrentMilleage,
        mileageUnit: newMilleageUnit,
        nextOilChangeDate,
      };

      // Update oil change history if the date has changed
      if (isOilChangeDateUpdated) {
        cars[index].oilChangeHistory = car.oilChangeHistory || [];

        // If history exists, update the last record; otherwise, add a new record
        if (cars[index].oilChangeHistory.length > 0) {
          const lastRecord =
            cars[index].oilChangeHistory[
              cars[index].oilChangeHistory.length - 1
            ];
          lastRecord.date = newLastOilChange;
          lastRecord.mileage = newCurrentMilleage;
        } else {
          cars[index].oilChangeHistory.push({
            date: newLastOilChange,
            oilType: newOilType,
            mileage: newCurrentMilleage,
            viscosity: newViscosity,
          });
        }
      }

      // Save the updated car list
      this.repository.saveCars(cars);
      return true;
    }
    return false;
  }

  public readCars(carOwnerId?: string): Car[] {
    const cars = this.repository.readCars();

    if (carOwnerId) {
      return cars.filter((car) => car.carOwnerId === carOwnerId);
    }

    return cars;
  }

  public deleteCar(id: string): boolean {
    const cars = this.repository.readCars();
    const index = cars.findIndex((car) => car._id === id);
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
