import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Car } from "../models/Car";
import { format } from "date-fns";

const VehiclePage: React.FC = () => {
  const [cars, setCars] = useState<Car[]>([]);
  const [message, setMessage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  // Fetch cars for a specific user based on JWT token
  const fetchedCars = async () => {
    const token = localStorage.getItem("authToken");

    if (!token) {
      setMessage("No token found. Please log in.");
      navigate("/signin");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("http://localhost:5112/vehicles/vehicle", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setCars(data);
      } else {
        const errorData = await response.text();
        setMessage(`Error: ${errorData}`);
      }
    } catch (error) {
      setMessage("An error occurred while fetching vehicles.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchedCars();
  }, []); // Fetch vehicles when the component is mounted

  const handleEditCar = (id: string) => {
    navigate(`/crudformpage/${id}`);
  };

  const handleOpenCar = (id: string) => {
    navigate(`/detailsvehicle/${id}`);
  };

  const handleDeleteCar = async (id: string) => {
    const token = localStorage.getItem("authToken");

    if (!token) {
      setMessage("No token found. Please log in.");
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:5112/vehicles/vehicle/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        setCars((prevCars) => prevCars.filter((car) => car.id !== id));
      } else {
        const errorData = await response.text();
        setMessage(`Error: ${errorData}`);
      }
    } catch (error) {
      setMessage("An error occurred while deleting the vehicle.");
    }
  };

  return (
    <>
      <section className="block flex">
        <header>
          <h3 className="vehicle__header">Your Vehicle</h3>
        </header>
        <Link to={"/crudformpage"} className="btn btn--accent">
          + Add
        </Link>
      </section>
      <section className="block">
        {message && <p className="error-message">{message}</p>}
        {loading ? (
          <p>Loading vehicles...</p> // Loading indicator
        ) : cars.length > 0 ? (
          cars.map((car) => (
            <article className="grid grid--1x3 sep" key={car.id}>
              <section>
                <img
                  className="vehicle__image"
                  src="src/assets/ford-mustang.png"
                  alt={`${car.brand} ${car.model}`}
                />
              </section>
              <section>
                <p>
                  Car name:{" "}
                  <span className="decoration">
                    {car.brand} {car.model}
                  </span>
                </p>
                <p>
                  Number plate:{" "}
                  <span className="decoration">{car.licensePlate}</span>
                </p>
                <p>
                  Mileage:{" "}
                  <span className="decoration">
                    {car.currentMilleage} {car.milleageUnit}
                  </span>
                </p>
                <p>
                  Next oil change:
                  <span className="decoration">
                    {car.nextOilChangeDate &&
                    typeof car.nextOilChangeDate === "string"
                      ? format(new Date(car.nextOilChangeDate), "yyyy-MM-dd")
                      : "No data available"}
                  </span>
                </p>
              </section>
              <section>
                <button
                  className="btn btn--edit"
                  onClick={() => handleEditCar(car.id)}
                >
                  Edit
                </button>
                <button
                  className="btn btn--delete"
                  onClick={() => handleDeleteCar(car.id)}
                >
                  Delete
                </button>
                <button className="btn" onClick={() => handleOpenCar(car.id)}>
                  Details
                </button>
              </section>
            </article>
          ))
        ) : (
          <p>No vehicles added yet.</p>
        )}
      </section>
    </>
  );
};

export default VehiclePage;
