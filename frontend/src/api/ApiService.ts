import { Car } from "../models/Car";

export interface Repository {
  // Cars
  readCars(): Car[];
  saveCars(cars: Car[]): void;

  setCurrentCar(car: string): void;
  getCurrentCarId(): string | null;
}

export class LocalRepository implements Repository {
  private static readonly carsStorageKey = "cars";
  private static readonly currentCarKey = "currentCar";

  public readCars(): Car[] {
    const carsData = localStorage.getItem(LocalRepository.carsStorageKey);
    return carsData ? JSON.parse(carsData) : [];
  }

  public saveCars(cars: Car[]): void {
    localStorage.setItem(LocalRepository.carsStorageKey, JSON.stringify(cars));
  }

  // Method for current car setting and retrieval remains unchanged
  public setCurrentCar(id: string): void {
    localStorage.setItem(LocalRepository.currentCarKey, id);
  }

  public getCurrentCarId(): string | null {
    return localStorage.getItem(LocalRepository.currentCarKey);
  }
}
