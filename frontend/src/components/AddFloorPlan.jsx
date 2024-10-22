import React, { useState } from "react";
import axios from "axios";
import "./AddFloorPlan.css"; // Importing the CSS file
import { useNavigate } from "react-router";

const AddFloorPlan = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [seats, setSeats] = useState([{ seatNumber: "", occupied: false }]);
  const [rooms, setRooms] = useState([{ roomNumber: "", capacity: "" }]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
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

    // Replace with actual ObjectId values from your user management logic
    const createdBy = "614a7c8e914c130e8c3c3c1f"; // Example ObjectId for admin
    const modifiedBy = createdBy; // Initially set to the same value

    const floorPlanData = {
      name,
      description,
      seats,
      rooms,
      createdBy,
      modifiedBy, // Make sure this is included
    };

    try {
      setIsLoading(true);
      const response = await axios.post(
        "http://localhost:5000/api/floorplans",
        floorPlanData
      );
      console.log("Floor Plan Created:", response.data);
      // Reset form or navigate to another page

      setName("");
      setDescription("");
      setSeats([{ seatNumber: "", occupied: false }]);
      setRooms([{ roomNumber: "", capacity: "" }]);
      setIsLoading(false);
      alert('Floor plan created successfully!');

    } catch (error) {
      console.error("Error creating floor plan:", error.response.data);
    }
  };

  if (isLoading) return <div className="loading-message">Creating Floor Plan ...</div>;
  return (
    <div className="add-floor-plan-container">
      <button className="back-button"onClick={() => navigate("/")}>Back to home</button>
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
