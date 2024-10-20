import { OIL_CHANGE_INTERVAL_KM } from "../models/Constant";

function calculateOilChange(
  averageKmPerYear: number,
  oilChangeIntervalKm: number = OIL_CHANGE_INTERVAL_KM
): number {
  return (oilChangeIntervalKm / averageKmPerYear) * 12;
}
