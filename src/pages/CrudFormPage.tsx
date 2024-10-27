import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CarManager } from "../services/CarService";
import { LocalRepository } from "../api/ApiService";
import { Car, MilleageUnit, OilType, TypeFuel, Viscosity } from "../models/Car";

const CrudFormPage: React.FC = () => {
  const navigate = useNavigate();
  const carManager = new CarManager(new LocalRepository());

  // Form state for each car attribute
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
  const [milleageUnit, setMilleageUnit] = useState<MilleageUnit>("Km");
  const [reminderBeforeChange, setReminderBeforeChange] = useState(1000);

  // Define fuel types, oil types, and viscosity mapping
  const fuelTypes = ["benzyna", "diesel", "hybryda", "elektryczny"] as const;
  const oilTypes: Record<TypeFuel, OilType[]> = {
    benzyna: ["synthetic", "semi-synthetic", "mineral"],
    diesel: ["diesel-special", "semi-synthetic", "mineral"],
    hybryda: ["synthetic", "hybrid-special"],
    elektryczny: ["electric-coolant"],
  };
  const oilToViscosityMap: Record<OilType, Viscosity[]> = {
    synthetic: ["0W-20", "5W-30", "10W-40"],
    "semi-synthetic": ["5W-30", "10W-40", "15W-40"],
    mineral: ["10W-40", "15W-40", "20W-50"],
    "diesel-special": ["10W-40", "15W-40"],
    "hybrid-special": ["0W-20", "5W-30"],
    "electric-coolant": [],
  };

  // Update oil type and reset viscosity when fuel type changes
  const handleFuelTypeChange = (newFuelType: TypeFuel) => {
    setTypeFuel(newFuelType);
    setOilType(oilTypes[newFuelType][0]);
    setViscosity(oilToViscosityMap[oilTypes[newFuelType][0]][0] || null);
  };

  // Update viscosity when oil type changes
  const handleOilTypeChange = (newOilType: OilType) => {
    setOilType(newOilType);
    setViscosity(oilToViscosityMap[newOilType][0] || null);
  };

  // Form submission handler
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const lastOilChangeDate = new Date(lastOilChange);
    // Add car using CarManager
    carManager.addCar(
      brand,
      model,
      typeFuel,
      licensePlate,
      lastOilChangeDate,
      oilChangeIntervalKm,
      oilType,
      viscosity!,
      averageKmPerYear,
      currentMilleage,
      milleageUnit,
      reminderBeforeChange
    );
    // Redirect after adding the car
    navigate("/vehicle");
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add New Car</h2>
      {/* Brand Field */}
      <div>
        <label>Brand:</label>
        <input
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
          type="number"
          value={oilChangeIntervalKm}
          onChange={(e) => setOilChangeIntervalKm(Number(e.target.value))}
          required
        />
      </div>
      {/* Oil Type Dropdown */}
      <div>
        <label>Oil Type:</label>
        <select
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
      {/* Average KM per Year Field */}
      <div>
        <label>Average KM per Year:</label>
        <input
          type="number"
          value={averageKmPerYear}
          onChange={(e) => setAverageKmPerYear(Number(e.target.value))}
          required
        />
      </div>
      {/* Current Mileage Field */}
      <div>
        <label>Current Mileage:</label>
        <input
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
          value={milleageUnit}
          onChange={(e) => setMilleageUnit(e.target.value as "Km" | "Mi")}
        >
          <option value="Km">Km</option>
          <option value="Mi">Mi</option>
        </select>
      </div>
      {/* Reminder Before Change Field */}
      <div>
        <label>Reminder Before Oil Change (KM):</label>
        <input
          type="number"
          value={reminderBeforeChange}
          onChange={(e) => setReminderBeforeChange(Number(e.target.value))}
          required
        />
      </div>
      <button type="submit">Add Car</button>
    </form>
  );
};

export default CrudFormPage;
