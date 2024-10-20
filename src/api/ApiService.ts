import { Car } from "../models/Car";

export interface Repository {
  // Cars
  readCars(): Car[];
  saveCars(cars: Car[]): void;
}

export class LocalRepository implements Repository {
  private static readonly carsStorageKey = "cars";
  private static readonly currentCarKey = "currentCar";

  //   Cars
  public readCars(): Car[] {
    const projectsData = localStorage.getItem(LocalRepository.carsStorageKey);
    return projectsData ? JSON.parse(projectsData) : [];
  }

  public saveCars(cars: Car[]): void {
    localStorage.setItem(LocalRepository.carsStorageKey, JSON.stringify(cars));
  }

  public setCurrentCar(id: string): void {
    localStorage.setItem(LocalRepository.currentCarKey, id);
  }

  public getCurrentCarId(): string | null {
    const currentCarId = localStorage.getItem(LocalRepository.currentCarKey);
    console.log(`Current Car ID: ${currentCarId}`);
    return currentCarId;
  }
}
