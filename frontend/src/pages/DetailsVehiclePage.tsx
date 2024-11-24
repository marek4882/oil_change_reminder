import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { OilChangeRecord, OilType, TypeFuel, Viscosity } from "../models/Car";
import carImage from "../assets/hero_images.svg";
import { format } from "date-fns";
import { Calendar, Drop, Gauge, PlusCircle } from "phosphor-react";
import { useCar } from "../hooks/useCar";
import { useDeleteCar } from "../hooks/useDeleteCar";
import { useAddOilChange } from "../hooks/useNextOil";
import { OIL_CHANGE_INTERVAL_KM } from "../models/Constant";

const calculateNextOilChangeDate = (
  averageKmPerYear: number,
  lastOilChange: Date
): Date => {
  // Oblicz liczbę miesięcy do kolejnej wymiany
  const monthsUntilNextChange =
    (OIL_CHANGE_INTERVAL_KM / averageKmPerYear) * 12;

  // Stwórz kopię daty ostatniej wymiany, aby dodać liczbę miesięcy
  const nextOilChangeDate = new Date(lastOilChange);
  nextOilChangeDate.setMonth(
    nextOilChangeDate.getMonth() + monthsUntilNextChange
  );

  // Sprawdź, czy data następnej wymiany przekracza 1 rok
  const oneYearLater = new Date(lastOilChange);
  oneYearLater.setFullYear(oneYearLater.getFullYear() + 1);

  // Jeśli następna data wymiany jest większa niż rok od ostatniej, ustaw na rok później
  if (nextOilChangeDate > oneYearLater) {
    return oneYearLater;
  }
  return nextOilChangeDate;
};

const DetailsVehiclePage: React.FC = () => {
  const { carId } = useParams<{ carId: string }>();
  const navigate = useNavigate();
  const [car, setCar, loading, error] = useCar(carId || "");
  const [deleteCar, deleteLoading, deleteError] = useDeleteCar();
  const [addOilChange, addOilChangeLoading, addOilChangeError] =
    useAddOilChange();

  const [showOilChangeForm, setShowOilChangeForm] = useState(false);

  const [oilChangeDate, setOilChangeDate] = useState<string>();
  const [oilType, setOilType] = useState<OilType>("Synthetic");
  const [mileage, setMileage] = useState<number>(0);
  const [viscosity, setViscosity] = useState<Viscosity>("0W-20");

  useEffect(() => {
    console.log(car);
    setOilChangeDate(car?.lastOilChange.toISOString() || oilChangeDate);
    setOilType(car?.oilType || oilType);
    setMileage(car?.currentMilleage || mileage);
    setViscosity(car?.viscosity || viscosity);
  }, [car]);

  const handleAddOilChange = async (
    id: string | undefined,
    date: string,
    oilType: string,
    viscosity: string,
    mileage: number
  ) => {
    if (car == null || typeof id !== "string") return;

    setShowOilChangeForm(false);
    await addOilChange(id, date, oilType, mileage, viscosity);
    const lastOilChange = new Date(date);

    const newCar = {
      ...car,
      nextOilChangeDate: calculateNextOilChangeDate(
        car.averageKmPerYear,
        lastOilChange
      ),
      lastOilChange,
      oilChangeHistory: [
        ...(car?.oilChangeHistory || []),
        {
          date: lastOilChange,
          mileage: mileage,
          oilType: oilType as OilType,
          viscosity: viscosity as Viscosity,
        } satisfies OilChangeRecord,
      ],
    };
    setCar(newCar);
  };

  const handleDeleteCar = async (id?: string) => {
    if (typeof id === "string") await deleteCar(id);
    navigate("/vehicle");
  };

  const handleEditCar = (id?: string) => {
    navigate(`/crudformpage/${id}`);
  };

  const handleOpenForm = () => {
    if (car?.oilChangeHistory && car.oilChangeHistory.length > 0) {
      const lastRecord = car.oilChangeHistory[car.oilChangeHistory.length - 1];
      setOilChangeDate(lastRecord.date.toISOString()); // Ustaw datę w formacie yyyy-MM-dd
      setOilType(lastRecord.oilType as OilType); // Ustaw typ oleju
      setViscosity(lastRecord.viscosity as Viscosity); // Ustaw lepkość
      setMileage(lastRecord.mileage); // Ustaw przebieg
    }
    setShowOilChangeForm(true);
  };

  // const handleSaveOilChange = () => {
  //   if (car && oilChangeDate && mileage) {
  //     const parsedDate = new Date(oilChangeDate);
  //     carManager.addOilChange(car.id, parsedDate, oilType, mileage);
  //     refreshCarDetails();
  //     setShowOilChangeForm(false);
  //   }
  // };
  const fuelTypes = ["Petrol", "Diesel", "Hybrid", "Electric"] as const;
  const oilTypes: Record<TypeFuel, OilType[]> = {
    Petrol: ["Synthetic", "Semi-synthetic", "Mineral"],
    Diesel: ["Diesel-special", "Semi-synthetic", "Mineral"],
    Hybrid: ["Synthetic", "Hybrid-special"],
    Electric: ["Electric-coolant"],
  };
  const oilToViscosityMap: Record<OilType, Viscosity[]> = {
    Synthetic: ["0W-20", "5W-30", "10W-40"],
    "Semi-synthetic": ["5W-30", "10W-40", "15W-40"],
    Mineral: ["10W-40", "15W-40", "20W-50"],
    "Diesel-special": ["10W-40", "15W-40"],
    "Hybrid-special": ["0W-20", "5W-30"],
    "Electric-coolant": [],
    Conventional: [],
    Blend: [],
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
                alt={`${car.brand} ${car.carModel}`}
              />
            </picture>
            <div>
              <h3 className="block__header">Details</h3>

              <p>
                Brand: <span className="decoration">{car.brand}</span>
              </p>
              <p>
                Model: <span className="decoration">{car.carModel}</span>
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
                  {car.lastOilChange
                    ? format(car.lastOilChange, "dd-MM-yyyy")
                    : "No data available"}
                </span>
              </p>
              <p>
                Oil Type:{" "}
                <span className="decoration">
                  {car.oilType} {car.viscosity}
                </span>
              </p>
              <p>
                Milleage:{" "}
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
            </div>
          </section>
          <section className="block">
            <div className="timeline-container">
              <h3 className="block__header">History</h3>
              <button className="btn" onClick={handleOpenForm}>
                Add Oil Change
              </button>
              {car.oilChangeHistory && car.oilChangeHistory.length > 0 ? (
                car.oilChangeHistory.map((record, index) => (
                  <div key={index} className="timeline-event">
                    <div className="timeline-date">
                      <PlusCircle size={32} />
                    </div>
                    <div className="timeline-content">
                      <p className="event-description">
                        <Calendar size={20} color="black" /> Oil Change Date:{" "}
                        <span className="decoration">
                          {format(new Date(record.date), "dd-MM-yyyy")}
                        </span>
                      </p>
                      <p className="event-description">
                        <Drop size={20} color="black" /> Oil Type:{" "}
                        <span className="decoration">
                          {record.oilType} {record.viscosity}{" "}
                        </span>
                      </p>
                      <p className="event-description">
                        <Gauge size={20} color="black" /> Milleage:{" "}
                        <span className="decoration">{record.mileage}</span>
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <p>No oil change history available.</p>
              )}
            </div>

            {/* Oil Change Form */}
            {showOilChangeForm && (
              <div className="oil-change-form">
                {/* Last Oil Change Date Field */}
                <div>
                  <label>Last Oil Change Date:</label>
                  <input
                    className="form-control"
                    type="date"
                    value={oilChangeDate}
                    onChange={(e) => setOilChangeDate(e.target.value)}
                    required
                  />
                </div>
                {/* Oil Type Dropdown */}
                <div>
                  <label>Oil Type:</label>
                  <select
                    className="form-control"
                    value={oilType}
                    onChange={(e) => setOilType(e.target.value as OilType)}
                  >
                    {car?.typeFuel &&
                      oilTypes[car.typeFuel].map((oil) => (
                        <option key={oil} value={oil}>
                          {oil}
                        </option>
                      ))}
                  </select>
                </div>
                {/* Viscosity Dropdown */}
                <div>
                  <label>Viscosity:</label>
                  <select
                    className="form-control"
                    value={viscosity || ""}
                    onChange={(e) => setViscosity(e.target.value as Viscosity)}
                    disabled={!oilType || !oilToViscosityMap[oilType].length} // Disable if no options
                    required
                  >
                    <option value="" disabled>
                      Select viscosity
                    </option>
                    {oilType &&
                      oilToViscosityMap[oilType].map((visc) => (
                        <option key={visc} value={visc}>
                          {visc}
                        </option>
                      ))}
                  </select>
                </div>
                {/* Current Mileage Field */}
                <div>
                  <label>Current Mileage:</label>
                  <input
                    className="form-control"
                    type="number"
                    value={mileage}
                    onChange={(e) => setMileage(Number(e.target.value))}
                    required
                  />
                </div>
                <button
                  className="btn btn--save"
                  onClick={() =>
                    handleAddOilChange(
                      car._id,
                      oilChangeDate!,
                      oilType,
                      viscosity,
                      mileage
                    )
                  }
                >
                  Save
                </button>
                <button
                  className="btn btn--cancel"
                  onClick={() => setShowOilChangeForm(false)}
                >
                  Cancel
                </button>
              </div>
            )}
          </section>
        </>
      ) : (
        <p>No car found with this ID.</p> // Handling case where no car is found
      )}
    </>
  );
};

export default DetailsVehiclePage;
