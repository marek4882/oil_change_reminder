import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { CarManager } from "../services/CarService";
import { LocalRepository } from "../api/ApiService";
import { MilleageUnit, OilType, TypeFuel, Viscosity } from "../models/Car";

const CrudFormPage: React.FC = () => {
  const { carId } = useParams<{ carId: string }>();
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [typeFuel, setTypeFuel] = useState<TypeFuel>("Petrol");
  const [licensePlate, setLicensePlate] = useState("");
  const [lastOilChange, setLastOilChange] = useState("");
  const [oilChangeIntervalKm, setOilChangeIntervalKm] = useState(15000);
  const [oilType, setOilType] = useState<OilType>("Synthetic");
  const [viscosity, setViscosity] = useState<Viscosity | null>(null);
  const [averageKmPerYear, setAverageKmPerYear] = useState(0);
  const [currentMilleage, setCurrentMilleage] = useState(0);
  const [mileageUnit, setMileageUnit] = useState<MilleageUnit>("Km");
  const [averageMileageLabel, setAverageMileageLabel] = useState(
    "Average Km per Year"
  );
  const carManager = new CarManager(new LocalRepository());

  const navigate = useNavigate();

  const [isDataLoaded, setIsDataLoaded] = useState(false);

  const token = localStorage.getItem("authToken");
  console.log(token);
  useEffect(() => {
    if (carId && !isDataLoaded) {
      const cars = carManager.readCars();
      const fetchedCar = cars.find((car) => car.id === carId);

      if (fetchedCar) {
        setBrand(fetchedCar.brand);
        setModel(fetchedCar.model);
        setTypeFuel(fetchedCar.typeFuel);
        setLicensePlate(fetchedCar.licensePlate);

        const lastOilChangeDate = new Date(fetchedCar.lastOilChange);
        setLastOilChange(
          isNaN(lastOilChangeDate.getTime())
            ? ""
            : lastOilChangeDate.toISOString().split("T")[0]
        );

        setOilChangeIntervalKm(fetchedCar.oilChangeIntervalKm);
        setOilType(fetchedCar.oilType);
        setViscosity(fetchedCar.viscosity);
        setAverageKmPerYear(fetchedCar.averageKmPerYear);
        setCurrentMilleage(fetchedCar.currentMilleage);
        setMileageUnit(fetchedCar.mileageUnit);
        console.log(fetchedCar);
      } else {
        console.log("Car not found for ID:", carId);
      }
      setIsDataLoaded(true);
    }
  }, [carId, carManager, isDataLoaded]);

  const handleFuelTypeChange = (newFuelType: TypeFuel) => {
    setTypeFuel(newFuelType);
    setOilType(oilTypes[newFuelType][0]);
    setViscosity(oilToViscosityMap[oilTypes[newFuelType][0]][0] || null);
  };

  const handleOilTypeChange = (newOilType: OilType) => {
    setOilType(newOilType);
    setViscosity(oilToViscosityMap[newOilType][0] || null);
  };

  const handleMileageUnitChange = (newUnit: MilleageUnit) => {
    setMileageUnit(newUnit);
    setAverageMileageLabel(`Average ${newUnit} per Year`);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Log the data being sent (for debugging purposes)
    const formData = {
      brand,
      carModel: model,
      typeFuel,
      licensePlate,
      lastOilChange,
      oilChangeIntervalKm,
      oilType,
      viscosity,
      averageKmPerYear,
      currentMilleage,
      mileageUnit,
    };
    console.log("Submitted data:", formData);

    // Prepare the payload for sending
    const response = await fetch(
      carId
        ? `http://localhost:5112/vehicles/crudformpage/${carId}`
        : "http://localhost:5112/vehicles/crudformpage",
      {
        method: carId ? "PUT" : "POST", // Use PUT for updating, POST for creating
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      }
    );

    if (response.ok) {
      const data = await response.json();
      console.log("Car data:", data);

      // Redirect user after success
      navigate("/vehicle");
    } else {
      const errorData = await response.json();
      console.error("Error:", errorData);
    }
  };

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

  return (
    <section className="block grid grid--1x2">
      <picture className="hero__image-container">
        <img className="hero__image" src="src/assets/hero_images.svg" alt="" />
      </picture>
      <form onSubmit={handleSubmit}>
        <h2>{carId ? "Edit Car" : "+ Add Car"}</h2>
        {/* Brand Field */}
        <div>
          <label>Brand:</label>
          <input
            className="form-control"
            type="text"
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
            required
          />
        </div>
        {/* Model Field */}
        <div>
          <label>Model:</label>
          <input
            className="form-control"
            type="text"
            value={model}
            onChange={(e) => setModel(e.target.value)}
            required
          />
        </div>
        {/* Fuel Type Dropdown */}
        <div>
          <label>Type of Fuel:</label>
          <select
            className="form-control"
            value={typeFuel}
            onChange={(e) => handleFuelTypeChange(e.target.value as TypeFuel)}
          >
            {fuelTypes.map((fuel) => (
              <option key={fuel} value={fuel}>
                {fuel}
              </option>
            ))}
          </select>
        </div>
        {/* License Plate Field */}
        <div>
          <label>License Plate:</label>
          <input
            className="form-control"
            type="text"
            value={licensePlate}
            onChange={(e) => setLicensePlate(e.target.value)}
            required
          />
        </div>
        {/* Last Oil Change Date Field */}
        <div>
          <label>Last Oil Change Date:</label>
          <input
            className="form-control"
            type="date"
            value={lastOilChange}
            onChange={(e) => setLastOilChange(e.target.value)}
            required
          />
        </div>
        {/* Oil Change Interval Field */}
        <div>
          <label>Oil Change Interval (KM):</label>
          <input
            className="form-control"
            type="number"
            value={oilChangeIntervalKm}
            onChange={(e) => setOilChangeIntervalKm(Number(e.target.value))}
            disabled
            required
          />
        </div>
        {/* Oil Type Dropdown */}
        <div>
          <label>Oil Type:</label>
          <select
            className="form-control"
            value={oilType}
            onChange={(e) => handleOilTypeChange(e.target.value as OilType)}
          >
            {oilTypes[typeFuel].map((oil) => (
              <option key={oil} value={oil}>
                {oil}
              </option>
            ))}
          </select>
        </div>
        {/* Viscosity Dropdown */}
        {oilToViscosityMap[oilType].length > 0 && (
          <div>
            <label>Oil Viscosity:</label>
            <select
              className="form-control"
              value={viscosity || ""}
              onChange={(e) => setViscosity(e.target.value as Viscosity)}
            >
              {oilToViscosityMap[oilType].map((v) => (
                <option key={v} value={v}>
                  {v}
                </option>
              ))}
            </select>
          </div>
        )}
        {/* Current Mileage Field */}
        <div>
          <label>Current Mileage:</label>
          <input
            className="form-control"
            type="number"
            value={currentMilleage}
            onChange={(e) => setCurrentMilleage(Number(e.target.value))}
            required
          />
        </div>
        {/* Mileage Unit Dropdown */}
        <div>
          <label>Mileage Unit:</label>
          <select
            className="form-control"
            value={mileageUnit}
            onChange={(e) =>
              handleMileageUnitChange(e.target.value as MilleageUnit)
            }
          >
            <option value="Km">Km</option>
            <option value="Mi">Mi</option>
          </select>
        </div>
        {/* Average KM per Year Field */}
        <div>
          <label>{averageMileageLabel}:</label>
          <input
            className="form-control"
            type="number"
            value={averageKmPerYear}
            onChange={(e) => setAverageKmPerYear(Number(e.target.value))}
            required
          />
        </div>

        <button className="btn btn--accent" type="submit">
          {carId ? "Edit Car" : "+ Add Car"}
        </button>
      </form>
    </section>
  );
};

export default CrudFormPage;
