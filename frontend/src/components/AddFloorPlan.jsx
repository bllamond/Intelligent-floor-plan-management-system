// AddFloorPlan.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import {
  saveFloorPlan,
  getFloorPlans,
  deleteFloorPlan,
} from "../services/indexedDB"; // Import IndexedDB functions
import "./AddFloorPlan.css"; // Importing the CSS file
import { v4 as uuidv4 } from 'uuid';

const AddFloorPlan = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [seats, setSeats] = useState([{ seatNumber: "", occupied: false }]);
  const [rooms, setRooms] = useState([{ roomNumber: "", capacity: "" }]);
  const [isLoading, setIsLoading] = useState(false);
  const [isOffline, setIsOffline] = useState(!navigator.onLine);
  const navigate = useNavigate();

  useEffect(() => {
    const handleOnline = () => {
      setIsOffline(false);
      syncFloorPlans(); // Sync offline changes when the app comes online
    };

    const handleOffline = () => setIsOffline(true);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    // Cleanup listeners on unmount
    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  const handleAddSeat = () => {
    setSeats([...seats, { seatNumber: "", occupied: false }]);
  };

  const handleAddRoom = () => {
    setRooms([...rooms, { roomNumber: "", capacity: "" }]);
  };

  const handleSeatChange = (index, event) => {
    const newSeats = [...seats];
    newSeats[index][event.target.name] = event.target.value;
    setSeats(newSeats);
  };

  const handleRoomChange = (index, event) => {
    const newRooms = [...rooms];
    newRooms[index][event.target.name] = event.target.value;
    setRooms(newRooms);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const createdBy = "614a7c8e914c130e8c3c3c1f";
    const modifiedBy = createdBy;

    const floorPlanData = {
      _id: uuidv4(), // Generate a unique ID for the floor plan
      name,
      description,
      seats,
      rooms,
      createdBy,
      modifiedBy,
      modifiedAt: new Date(),
    };

    try {
      setIsLoading(true);
      if (isOffline) {
        // Save to IndexedDB when offline
        await saveFloorPlan(floorPlanData);
        alert('Floor plan saved locally. Will sync when online.');
      } else {
        // Perform a regular network request to the server
        const response = await axios.post(
          "http://localhost:5000/api/floorplans",
          floorPlanData
        );
        console.log("Floor Plan Created:", response.data);
        alert('Floor plan created successfully!');
      }

      // Clear form fields
      setName("");
      setDescription("");
      setSeats([{ seatNumber: "", occupied: false }]);
      setRooms([{ roomNumber: "", capacity: "" }]);
      setIsLoading(false);

    } catch (error) {
      console.error("Error creating floor plan:", error);
      alert('Error creating floor plan. Please try again.');
      setIsLoading(false);
    }
  };

  const syncFloorPlans = async () => {
    // Sync locally saved floor plans to the server
    const floorPlans = await getFloorPlans();
    for (const floorPlan of floorPlans) {
      try {
        const response = await axios.post(
          "http://localhost:5000/api/floorplans",
          floorPlan
        );
        console.log("Synced Floor Plan:", response.data);
        // Delete the local copy after successful sync
        await deleteFloorPlan(floorPlan._id);
      } catch (error) {
        console.error("Error syncing floor plan:", error);
      }
    }
  };

  if (isLoading) return <div className="loading-message">Creating Floor Plan ...</div>;

  return (
    <div className="add-floor-plan-container">
      <button className="back-button" onClick={() => navigate("/")}>
        Back to home
      </button>
      <h2>Add Floor Plan</h2>
      <form onSubmit={handleSubmit} className="floor-plan-form">
        <div className="form-group">
          <label>Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Description:</label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <h3>Seats</h3>
        {seats.map((seat, index) => (
          <div key={index} className="seat-room-group">
            <div className="form-group">
              <label>Seat Number:</label>
              <input
                type="number"
                name="seatNumber"
                value={seat.seatNumber}
                onChange={(e) => handleSeatChange(index, e)}
                required
              />
            </div>
            <div className="form-group">
              <label>Occupied:</label>
              <input
                type="checkbox"
                checked={seat.occupied}
                onChange={(e) =>
                  handleSeatChange(index, {
                    target: { name: "occupied", value: e.target.checked },
                  })
                }
              />
            </div>
          </div>
        ))}
        <button type="button" className="add-button" onClick={handleAddSeat}>
          Add Another Seat
        </button>

        <h3>Rooms</h3>
        {rooms.map((room, index) => (
          <div key={index} className="seat-room-group">
            <div className="form-group">
              <label>Room Number:</label>
              <input
                type="number"
                name="roomNumber"
                value={room.roomNumber}
                onChange={(e) => handleRoomChange(index, e)}
                required
              />
            </div>
            <div className="form-group">
              <label>Capacity:</label>
              <input
                type="number"
                name="capacity"
                value={room.capacity}
                onChange={(e) => handleRoomChange(index, e)}
                required
              />
            </div>
          </div>
        ))}
        <button type="button" className="add-button" onClick={handleAddRoom}>
          Add Another Room
        </button>

        <button type="submit" className="submit-button">
          Create Floor Plan
        </button>
      </form>
    </div>
  );
};

export default AddFloorPlan;
