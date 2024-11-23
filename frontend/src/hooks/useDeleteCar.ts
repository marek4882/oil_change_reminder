import { useCallback, useState } from "react";

const deleteCar = async (id: string) => {
  const token = localStorage.getItem("authToken");

  const response = await fetch(`http://localhost:5112/vehicles/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to delete resource with ID: ${id}`);
  }
};

export const useDeleteCar = (): [
  (id: string) => Promise<void>,
  boolean,
  string | undefined
] => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>();

  const handle = useCallback(async (id: string) => {
    setLoading(true);
    setError(undefined);

    try {
      await deleteCar(id);
    } catch (e) {
      console.error(e);
      if (e instanceof Error) {
        setError(e.message);
      }
    }

    setLoading(false);
  }, []);

  return [handle, loading, error];
};
