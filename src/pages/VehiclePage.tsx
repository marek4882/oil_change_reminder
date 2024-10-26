import React, { useState, useEffect } from "react";
import { LocalRepository } from "../api/ApiService";
import { Link, useNavigate } from "react-router-dom";
import { Car } from "../models/Car";
import { CarManager } from "../services/CarService";

const VehiclePage: React.FC = () => {
  const [cars, setCars] = useState<Car[]>([]);
  const carManager = new CarManager(new LocalRepository());
  const navigate = useNavigate();
  useEffect(() => {
    const fetchedCars = carManager.readCars();
    setCars(fetchedCars);
  }, []);

  const refreshCarList = () => {
    const cars = carManager.readCars();
    setCars(cars);
    console.log("Cars list refreshed: ", cars);
  };

  const handleDeleteStory = (id: string) => {
    const deleted = carManager.deleteCar(id);
    if (deleted) {
      refreshCarList();
    } else {
      alert("Unable to delete story - story with the given ID does not exist.");
    }
  };

  const handleOpenStory = (id: string) => {
    carManager.setCurrentCar(id);
    navigate(`/detailsvehicle/${id}`);
  };

  return (
    <>
      <section className="block flex">
        <header>
          <h3 className="vehicle__header">Your Vechicle</h3>
        </header>

        <Link to={"/crudformpage"} className="btn btn--accent">
          + Add
        </Link>
      </section>
      <section className="block">
        {cars.length > 0 ? (
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
                  Nazwa:{" "}
                  <span className="decoration">
                    {car.brand} {car.model}
                  </span>
                </p>
                <p>
                  Numer rejestracyjny:{" "}
                  <span className="decoration">{car.licensePlate}</span>
                </p>
                <p>
                  Przebieg:{" "}
                  <span className="decoration">
                    {car.currentMilleage} {car.milleageUnit}
                  </span>
                </p>
              </section>
              <section>
                <p>Kolejna Wymiana Oleju</p>
                <p>
                  <span className="decoration"></span>
                </p>
                <button className="btn btn--edit">Edit</button>
                <button
                  className="btn btn--delete"
                  onClick={() => handleDeleteStory(car.id)}
                >
                  Delete
                </button>
              </section>
              <section>
                <button className="btn" onClick={() => handleOpenStory(car.id)}>
                  Szczegóły
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
