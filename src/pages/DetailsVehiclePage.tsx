import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Car } from "../models/Car";
import { CarManager } from "../services/CarService";
import { LocalRepository } from "../api/ApiService";

const DetailsVehiclePage: React.FC = () => {
  const { carId } = useParams<{ carId: string }>();
  const navigate = useNavigate();
  const carManager = new CarManager(new LocalRepository());

  const [car, setCar] = useState<Car | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (carId) {
      carManager.setCurrentCar(carId);
      refreshCarDetails();
    }
  }, [carId]); // Add carId to dependency array

  const refreshCarDetails = () => {
    const cars = carManager.readCars();
    const foundCar = cars.find((car) => car.id === carId);
    setCar(foundCar || null);
    setLoading(false);
  };

  const handleEdit = () => {
    if (car) {
      // Navigate to the edit page with the car ID
      navigate(`/edit-car/${car.id}`);
    }
  };

  const handleDelete = () => {
    if (car) {
      carManager.deleteCar(car.id);
      navigate("/"); // Redirect to home or cars list after deletion
    }
  };

  if (loading) {
    return <p>Loading car details...</p>; // Show loading state
  }

  return (
    <>
      {car ? (
        <>
          <section className="block grid grid--1x2">
            <picture>
              <img
                className="vehicle__image vehicle__image__large"
                src="src\assets\ford-mustang-mach.png"
                alt={`${car.brand} ${car.model}`}
              />
            </picture>
            <div>
              <h3 className="block__header">Details</h3>

              <p>
                Brand: <span className="decoration">{car.brand}</span>
              </p>
              <p>
                Model: <span className="decoration">{car.model}</span>
              </p>
              <p>
                Brand: <span className="decoration">{car.brand}</span>
              </p>
              <p>
                Brand: <span className="decoration">{car.brand}</span>
              </p>
              <p>
                Numer rejestracyjny:{" "}
                <span className="decoration">{car.licensePlate}</span>
              </p>
              <p>
                Oil Type: <span className="decoration">{car.oilType}</span>
              </p>
              <p>
                Przebieg:{" "}
                <span className="decoration">
                  {car.currentMilleage} {car.milleageUnit}
                </span>
              </p>
              <button className="btn btn--edit" onClick={handleEdit}>
                Edit
              </button>
              <button className="btn btn--delete" onClick={handleDelete}>
                Delete
              </button>
            </div>
          </section>
        </>
      ) : (
        <p>No car found with this ID.</p> // Handling case where no car is found
      )}
    </>
  );
};

export default DetailsVehiclePage;
