import React, { useState, useEffect } from "react";
import axios from "axios";

const MeetingRoomBooking = () => {
  const [availableRooms, setAvailableRooms] = useState([]);
  const [recommendedRooms, setRecommendedRooms] = useState([]);
  const [participants, setParticipants] = useState(0);
  const [selectedFloor, setSelectedFloor] = useState("");
  const [floorPlans, setFloorPlans] = useState([]);

  // Fetch floor plans on component mount
  useEffect(() => {
    const fetchFloorPlans = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/floorplans");
        setFloorPlans(response.data);
      } catch (error) {
        console.error("Error fetching floor plans:", error);
      }
    };

    fetchFloorPlans();
  }, []);

  // Fetch available rooms based on selected floor and participants
  const fetchAvailableRooms = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/meetingRooms/available', {
        params: { floorId: selectedFloor, minCapacity: participants },
      });
      setAvailableRooms(response.data);
    } catch (error) {
      console.error('Error fetching available rooms:', error);
      setAvailableRooms([]);
    }
  };

  // Fetch recommended rooms based on number of participants
  const fetchRecommendedRooms = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/meetingRooms/recommendations", {
        params: { floorId: selectedFloor, participants },
      });
      setRecommendedRooms(response.data);
    } catch (error) {
      console.error("Error fetching recommendations:", error);
    }
  };

  // Handle room booking
  const handleBookRoom = async (roomId) => {
    try {
      await axios.post("http://localhost:5000/api/meetingRooms/book", { roomId });
      alert("Room booked successfully!");
      fetchAvailableRooms(); // Refresh available rooms
    } catch (error) {
      console.error("Error booking room:", error);
    }
  };

  return (
    <div>
      <h2>Meeting Room Booking</h2>
      <div>
        <label>Number of Participants:</label>
        <input
          type="number"
          value={participants}
          onChange={(e) => setParticipants(Number(e.target.value))}
        />
        
        <label>Select Floor:</label>
        <select value={selectedFloor} onChange={(e) => setSelectedFloor(e.target.value)}>
          <option value="">Select Floor</option>
          {floorPlans.map((floor) => (
            <option key={floor._id} value={floor._id}>
              {floor.name}
            </option>
          ))}
        </select>
        
        <button onClick={fetchRecommendedRooms}>Get Recommendations</button>
        <button onClick={fetchAvailableRooms}>Refresh Available Rooms</button>
      </div>

      <h3>Recommended Rooms</h3>
      <ul>
        {recommendedRooms.map((room) => (
          <li key={room._id}>
            Room {room.roomNumber} (Capacity: {room.capacity})
            <button onClick={() => handleBookRoom(room._id)}>Book</button>
          </li>
        ))}
      </ul>

      <h3>Available Rooms</h3>
      <ul>
        {Array.isArray(availableRooms) && availableRooms.length > 0 ? (
          availableRooms.map((room) => (
            <li key={room._id}>
              Room {room.roomNumber} (Capacity: {room.capacity}) 
              <button onClick={() => handleBookRoom(room._id)}>Book</button>
            </li>
          ))
        ) : (
          <li>No available rooms found</li>
        )}
      </ul>
    </div>
  );
};

export default MeetingRoomBooking;
