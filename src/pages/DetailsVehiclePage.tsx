import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Car } from "../models/Car";
import { CarManager } from "../services/CarService";
import { LocalRepository } from "../api/ApiService";
import carImage from "../assets/ford-mustang.png";

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
  }, [carId]);

  const refreshCarDetails = () => {
    const cars = carManager.readCars();
    const foundCar = cars.find((car) => car.id === carId);

    if (foundCar) {
      foundCar.lastOilChange = new Date(foundCar.lastOilChange);
    }

    setCar(foundCar || null);
    setLoading(false);
    console.log("id of the car", foundCar, "car", cars);
  };

  const handleEdit = () => {
    if (car) {
      navigate(`/crudformpage/${car.id}`);
    }
  };

  const handleDelete = () => {
    if (car) {
      carManager.deleteCar(car.id);
      navigate("/vehicle"); // Redirect to home or cars list after deletion
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
                src={carImage}
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
                Type fuel: <span className="decoration">{car.typeFuel}</span>
              </p>
              <p>
                License plate:{" "}
                <span className="decoration">{car.licensePlate}</span>
              </p>
              <p>
                Last oil change:{" "}
                <span className="decoration">
                  {car.lastOilChange.toLocaleDateString()}
                </span>
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
          <section className="block">
            <div className="timeline-container">
              <div className="timeline-event">
                <div className="timeline-date">2020</div>
                <div className="timeline-content">
                  <h3 className="event-title">Event Title 1</h3>
                  <p className="event-description">
                    This is a description of the first event. It took place in
                    2020.
                  </p>
                </div>
              </div>
              <div className="timeline-event">
                <div className="timeline-date">2021</div>
                <div className="timeline-content">
                  <h3 className="event-title">Event Title 2</h3>
                  <p className="event-description">
                    This is a description of the second event. It took place in
                    2021.
                  </p>
                </div>
              </div>
              <div className="timeline-event">
                <div className="timeline-date">2022</div>
                <div className="timeline-content">
                  <h3 className="event-title">Event Title 3</h3>
                  <p className="event-description">
                    This is a description of the third event. It took place in
                    2022.
                  </p>
                </div>
              </div>
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
