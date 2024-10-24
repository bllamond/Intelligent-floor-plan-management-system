import React, { useState, useEffect } from "react";
import axios from "axios";

const MeetingRoomForm = () => {
  const [roomNumber, setRoomNumber] = useState("");
  const [capacity, setCapacity] = useState("");
  const [floorPlans, setFloorPlans] = useState([]);
  const [selectedFloor, setSelectedFloor] = useState("");
  const [Open, setOpen] = useState(true);

  useEffect(() => {
    const fetchFloorPlans = async () => {
      const response = await axios.get("http://localhost:5000/api/floorplans");
      setFloorPlans(response.data);
    };

    fetchFloorPlans();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const meetingRoomData = {
      roomNumber,
      capacity,
      floorPlanId: selectedFloor,
    };
    console.log(meetingRoomData)
    try {
      await axios.post(
        "http://localhost:5000/api/meetingRooms",
        meetingRoomData
      );
      alert("Meeting room added successfully!");
    } catch (error) {
      console.error("Error adding meeting room:", error);
      alert("Failed to add meeting room.");
    }
  };

  return (
    <>
      <button onClick={() => setOpen(!Open)}>Add Meeting Room</button>
      {Open && (
        <form onSubmit={handleSubmit}>
          <input
            type="number"
            placeholder="Room Number"
            value={roomNumber}
            onChange={(e) => setRoomNumber(e.target.value)}
            required
          />
          <input
            type="number"
            placeholder="Capacity"
            value={capacity}
            onChange={(e) => setCapacity(e.target.value)}
            required
          />
          <select
            value={selectedFloor}
            onChange={(e) => setSelectedFloor(e.target.value)}
            required
          >
            <option value="">Select Floor</option>
            {floorPlans.map((floor) => (
              <option key={floor._id} value={floor._id}>
                {floor.name}
              </option>
            ))}
          </select>
          <button type="submit">Add</button>
        </form>
      )}
    </>
  );
};

export default MeetingRoomForm;
