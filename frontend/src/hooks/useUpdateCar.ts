import { useCallback, useState } from "react";

// Function to handle both add and update operations
const updateOrAddCar = async (id: string | null, carData: object) => {
  const token = localStorage.getItem("authToken");

  console.log(id, carData);

  // const response = await fetch(
  //   id
  //     ? `http://localhost:5112/vehicles/${id}`
  //     : "http://localhost:5112/vehicles",
  //   {
  //     method: id ? "PUT" : "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //       Authorization: `Bearer ${token}`,
  //     },
  //     body: JSON.stringify(carData),
  //   }
  // );

  // if (!response.ok) {
  //   throw new Error(
  //     `Failed to ${id ? "update" : "add"} resource with ID: ${id || "new"}`
  //   );
  // }

  // return response.json(); // Return the response data
};

export const useUpdateOrAddCar = (): [
  (id: string | null, carData: object) => Promise<void>,
  boolean,
  string | undefined
] => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>();

  const handle = useCallback(async (id: string | null, carData: object) => {
    setLoading(true);
    setError(undefined);

    try {
      await updateOrAddCar(id, carData);
    } catch (e) {
      console.error(e);
      if (e instanceof Error) {
        setError(e.message);
      }
    } finally {
      setLoading(false);
    }
  }, []);

  return [handle, loading, error];
};
