import React, { useState, useEffect } from "react";
import { LocalRepository } from "../api/ApiService";
import { Link } from "react-router-dom";
import { Car } from "../models/Car";
import { CarManager } from "../services/CarService";

const VehiclePage: React.FC = () => {
  const [cars, setCars] = useState<Car[]>([]);
  const carManager = new CarManager(new LocalRepository());

  // Fetch cars on component load
  useEffect(() => {
    const fetchedCars = carManager.readCars();
    setCars(fetchedCars);
  }, []);

  return (
    <section className="block">
      {cars.length > 0 ? (
        cars.map((car) => (
          <article className="grid grid--1x3 sep" key={car.id}>
            <section>
              <img
                className="vehicle__image"
                src={"srcassets\ford-mustang.png"}
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
                  {car.currentMilleage}
                  {car.milleageUnit}
                </span>
              </p>
            </section>
            <section>
              <p>Kolejna Wymiana Oleju</p>
              <p>
                <span className="decoration">
                  {new Date(
                    new Date(car.lastOilChange).getTime() +
                      car.oilChangeIntervalKm * 1000 * 60 * 60 * 24
                  ).toLocaleDateString()}
                </span>
              </p>
              <button className="btn btn--edit">Edit</button>
              <button className="btn btn--delete">Delete</button>
            </section>
            <section>
              <button className="btn">
                <Link to={`/detailsvehicle/${car.id}`}>Szczegóły</Link>
              </button>
            </section>
          </article>
        ))
      ) : (
        <p>No vehicles added yet.</p>
      )}
    </section>
  );
};

export default VehiclePage;
