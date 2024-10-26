import React, { useState } from "react";
import { LocalRepository } from "../api/ApiService"; // Assuming ApiService holds the repository
import { useNavigate } from "react-router-dom";
import { CarManager } from "../services/CarService";

const CrudFormPage: React.FC = () => {
  const navigate = useNavigate();

  // Initialize the CarManager with LocalRepository
  const carManager = new CarManager(new LocalRepository());

  // Form state for each car attribute
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [typeFuel, setTypeFuel] = useState("");
  const [licensePlate, setLicensePlate] = useState("");
  const [lastOilChange, setLastOilChange] = useState("");
  const [oilChangeIntervalKm, setOilChangeIntervalKm] = useState(15000);
  const [oilType, setOilType] = useState("");
  const [averageKmPerYear, setAverageKmPerYear] = useState(0);
  const [currentMilleage, setCurrentMilleage] = useState(0);
  const [milleageUnit, setMilleageUnit] = useState("KM");
  const [reminderBeforeChange, setReminderBeforeChange] = useState(1000);

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Convert string input of last oil change to Date
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
      averageKmPerYear,
      currentMilleage,
      milleageUnit,
      reminderBeforeChange
    );

    // Redirect back to the vehicle page after adding
    navigate("/vehicle");
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <h2>Add New Car</h2>
        <div>
          <label>Brand:</label>
          <input
            type="text"
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Model:</label>
          <input
            type="text"
            value={model}
            onChange={(e) => setModel(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Type of Fuel:</label>
          <input
            type="text"
            value={typeFuel}
            onChange={(e) => setTypeFuel(e.target.value)}
            required
          />
        </div>
        <div>
          <label>License Plate:</label>
          <input
            type="text"
            value={licensePlate}
            onChange={(e) => setLicensePlate(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Last Oil Change Date:</label>
          <input
            type="date"
            value={lastOilChange}
            onChange={(e) => setLastOilChange(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Oil Change Interval (KM):</label>
          <input
            type="number"
            value={oilChangeIntervalKm}
            onChange={(e) => setOilChangeIntervalKm(Number(e.target.value))}
            required
          />
        </div>
        <div>
          <label>Oil Type:</label>
          <input
            type="text"
            value={oilType}
            onChange={(e) => setOilType(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Average KM per Year:</label>
          <input
            type="number"
            value={averageKmPerYear}
            onChange={(e) => setAverageKmPerYear(Number(e.target.value))}
            required
          />
        </div>
        <div>
          <label>Current Mileage:</label>
          <input
            type="number"
            value={currentMilleage}
            onChange={(e) => setCurrentMilleage(Number(e.target.value))}
            required
          />
        </div>
        <div>
          <label>Mileage Unit:</label>
          <select
            value={milleageUnit}
            onChange={(e) => setMilleageUnit(e.target.value)}
          >
            <option value="KM">KM</option>
            <option value="Miles">Miles</option>
          </select>
        </div>
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
    </>
  );
};

export default CrudFormPage;
