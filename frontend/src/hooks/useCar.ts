import { useState, useEffect } from "react";
import { Car } from "../models/Car";

const getCarById = async (carId: string): Promise<Response> => {
  const token = localStorage.getItem("authToken");
  return fetch(`http://localhost:5112/vehicles/${carId}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
};

export const useCar = (
  id: string
): [Car | null, boolean, string | undefined] => {
  const [car, setCar] = useState<Car | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>();

  // Function to fetch car data by ID
  useEffect(() => {
    getCarById(id)
      .then(async (response) => {
        const json = await response.json();
        setCar({
          ...json.car,
          lastOilChange: new Date(json.car.lastOilChange),
          nextOilChangeDate: new Date(json.car.nextOilChangeDate),
        });
      })
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  return [car, loading, error] as const;
};
