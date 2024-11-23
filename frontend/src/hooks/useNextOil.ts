import { useCallback, useState } from "react";

// Helper function for the API call
const addOilChange = async (
  id: string,
  date: string,
  oilType: string,
  mileage: number
) => {
  const token = localStorage.getItem("authToken");

  // Perform early validation before calling the API
  if (!date || !oilType || !mileage) {
    throw new Error("Date, oilType, and mileage are required.");
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
  (id: string, date: string, oilType: string, mileage: number) => Promise<void>,
  boolean,
  string | undefined
] => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | undefined>();

  const handle = useCallback(
    async (id: string, date: string, oilType: string, mileage: number) => {
      setLoading(true);
      setError(undefined); // Reset error state on each attempt

      try {
        await addOilChange(id, date, oilType, mileage);
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
