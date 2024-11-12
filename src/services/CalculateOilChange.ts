import { OIL_CHANGE_INTERVAL_KM } from "../models/Constant";

export function calculateNextOilChangeDate(
  lastOilChange: Date,
  averageKmPerYear: number,
  oilChangeIntervalKm: number = OIL_CHANGE_INTERVAL_KM
): Date {
  // Oblicz liczbę miesięcy do kolejnej wymiany
  const monthsUntilNextChange = (oilChangeIntervalKm / averageKmPerYear) * 12;

  // Stwórz kopię daty ostatniej wymiany, aby dodać liczbę miesięcy
  const nextOilChangeDate = new Date(lastOilChange);
  nextOilChangeDate.setMonth(
    nextOilChangeDate.getMonth() + monthsUntilNextChange
  );

  // Sprawdź, czy data następnej wymiany przekracza 1 rok
  const oneYearLater = new Date(lastOilChange);
  oneYearLater.setFullYear(oneYearLater.getFullYear() + 1);

  // Jeśli następna data wymiany jest większa niż rok od ostatniej, ustaw na rok później
  if (nextOilChangeDate > oneYearLater) {
    return oneYearLater;
  }
  return nextOilChangeDate;
}
