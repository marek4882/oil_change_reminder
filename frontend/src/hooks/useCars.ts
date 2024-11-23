import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Car } from "../models/Car";

const getCars = async (): Promise<Response> => {
  const token = localStorage.getItem("authToken");
  return fetch(`http://localhost:5112/vehicles/`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
};

export const useCars = (): [
  Car[],
  Dispatch<SetStateAction<Car[]>>,
  boolean,
  string | undefined
] => {
  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>();

  useEffect(() => {
    getCars()
      .then(async (response) => {
        const json = await response.json();
        setCars(
          json.vehicles.map((car: Record<string, unknown>) => ({
            ...car,
            lastOilChange: new Date(car.lastOilChange as string),
            nextOilChangeDate: new Date(car.nextOilChangeDate as string),
          }))
        );
      })
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  return [cars, setCars, loading, error];
};
