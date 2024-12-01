import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { useCars } from "../hooks/useCars";
import { useDeleteCar } from "../hooks/useDeleteCar";

const VehiclePage: React.FC = () => {
  const [cars, setCars, loading, message] = useCars();
  const [deleteCar, deleteLoading, deleteError] = useDeleteCar();
  const navigate = useNavigate();

  const handleEditCar = (id: string) => {
    navigate(`/crudformpage/${id}`);
  };

  const handleOpenCar = (id: string) => {
    navigate(`/detailsvehicle/${id}`);
  };

  const handleDeleteCar = async (id: string) => {
    setCars(cars.filter((car) => car._id != id));
    await deleteCar(id);
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
          cars.map((car, i) => (
            <article className="grid grid--1x3 sep" key={i}>
              <section>
                <img
                  className="vehicle__image"
                  src="src/assets/ford-mustang.png"
                  alt={`${car.brand} ${car.carModel}`}
                />
              </section>
              <section>
                <p>
                  Car name:{" "}
                  <span className="decoration">
                    {car.brand} {car.carModel}
                  </span>
                </p>
                <p>
                  Number plate:{" "}
                  <span className="decoration">{car.licensePlate}</span>
                </p>
                <p>
                  Mileage:{" "}
                  <span className="decoration">
                    {car.currentMilleage} {car.mileageUnit}
                  </span>
                </p>
                <p>
                  Next oil change:{" "}
                  <span className="decoration">
                    {car.nextOilChangeDate
                      ? format(car.nextOilChangeDate, "dd-MM-yyyy")
                      : "Brak danych"}
                  </span>
                </p>
              </section>
              <section>
                <button
                  className="btn btn--edit"
                  onClick={() => handleEditCar(car._id)}
                >
                  Edit
                </button>
                <button
                  className="btn btn--delete"
                  onClick={() => handleDeleteCar(car._id)}
                >
                  Delete
                </button>
                <button className="btn" onClick={() => handleOpenCar(car._id)}>
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
