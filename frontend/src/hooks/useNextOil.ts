import { useCallback, useState } from "react";

const addOilChange = async (
  id: string,
  date: string,
  oilType: string,
  mileage: number,
  viscosity: string // Added viscosity
) => {
  const token = localStorage.getItem("authToken");

  console.log({
    date,
    oilType,
    mileage,
    viscosity,
  });
  // Perform early validation before calling the API
  if (!date || !oilType || !mileage || !viscosity) {
    throw new Error("Date, oilType, viscosity, and mileage are required.");
  }

  const response = await fetch(`http://localhost:5112/vehicles/${id}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      date,
      oilType,
      mileage,
      viscosity, // Send viscosity to the API
    }),
  });

  // Handle non-OK responses
  if (!response.ok) {
    const errorDetails = await response.json();
    throw new Error(
      errorDetails.message || `Failed to add next Oil Change for ID: ${id}`
    );
  }

  return response.json();
};

// Custom hook to handle adding oil change
export const useAddOilChange = (): [
  (
    id: string,
    date: string,
    oilType: string,
    mileage: number,
    viscosity: string
  ) => Promise<void>,
  boolean,
  string | undefined
] => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | undefined>();

  const handle = useCallback(
    async (
      id: string,
      date: string,
      oilType: string,
      mileage: number,
      viscosity: string
    ) => {
      setLoading(true);
      setError(undefined); // Reset error state on each attempt

      try {
        // Pass viscosity to the addOilChange function
        await addOilChange(id, date, oilType, mileage, viscosity);
      } catch (e) {
        console.error(e);
        if (e instanceof Error) {
          setError(e.message); // Store the error message to display
        }
      }

      setLoading(false); // End loading state
    },
    []
  );

  return [handle, loading, error];
};
