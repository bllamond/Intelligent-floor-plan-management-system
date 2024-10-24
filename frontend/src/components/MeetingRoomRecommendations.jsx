// import React, { useState, useEffect } from "react";
// import axios from "axios";

// const MeetingRoomBooking = () => {
//   const [availableRooms, setAvailableRooms] = useState([]);
//   const [recommendedRooms, setRecommendedRooms] = useState([]);
//   const [participants, setParticipants] = useState(0);

//   useEffect(() => {
//     fetchAvailableRooms();
//   }, []);

//   const fetchAvailableRooms = async () => {
//     try {
//       const response = await axios.get('http://localhost:5000/api/meetingRooms/available', {
//         params: { minCapacity: participants },
//       });
//         setAvailableRooms(response.data);
//     } catch (error) {
//       console.error('Error fetching available rooms:', error);
//       setAvailableRooms([]);
//     }
//   };
  
  

//   const fetchRecommendedRooms = async () => {
//     try {
//       const response = await axios.get("/api/meetingRooms/recommend", {
//         params: { participants },
//       });
//       setRecommendedRooms(response.data);
//     } catch (error) {
//       console.error("Error fetching recommendations:", error);
//     }
//   };

//   const handleBookRoom = async (roomId) => {
//     try {
//       await axios.post("/api/meetingRooms/book", { roomId });
//       alert("Room booked successfully!");
//       fetchAvailableRooms(); // Refresh available rooms
//     } catch (error) {
//       console.error("Error booking room:", error);
//     }
//   };

//   return (
//     <div>
//       <h2>Meeting Room Booking</h2>
//       <div>
//         <label>Number of Participants:</label>
//         <input
//           type="number"
//           value={participants}
//           onChange={(e) => setParticipants(Number(e.target.value))}
//         />
//         <button onClick={fetchRecommendedRooms}>Get Recommendations</button>
//       </div>

//       <h3>Recommended Rooms</h3>
//       <ul>
//         {recommendedRooms.map((room) => (
//           <li key={room._id}>
//             Room {room.roomNumber} (Capacity: {room.capacity})
//             <button onClick={() => handleBookRoom(room._id)}>Book</button>
//           </li>
//         ))}
//       </ul>

//       <h3>Available Rooms</h3>
//       <ul>
//         {Array.isArray(availableRooms) && availableRooms.length > 0 ? (
//           availableRooms.map((room) => (
//             <li key={room._id}>
//               Room {room.roomNumber} (Capacity: {room.capacity})
//               <button onClick={() => handleBookRoom(room._id)}>Book</button>
//             </li>
//           ))
//         ) : (
//           <li>No available rooms found</li>
//         )}
//       </ul>
//     </div>
//   );
// };
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const MeetingRoomRecommendations = () => {
  const [floorId, setFloorId] = useState('');
  const [recommendedRooms, setRecommendedRooms] = useState([]);
  const [floorPlans, setFloorPlans] = useState([]);

  useEffect(() => {
    const fetchFloorPlans = async () => {
      const response = await axios.get('http://localhost:5000/api/floorplans');
      setFloorPlans(response.data);
    };

    fetchFloorPlans();
  }, []);

  const fetchRecommendations = async () => {
    const response = await axios.get("http://localhost:5000/api/recommendations", { params: { floorId } });
    setRecommendedRooms(response.data);
  };

  return (
    <div>
      <select value={floorId} onChange={(e) => setFloorId(e.target.value)}>
        <option value="">All Floors</option>
        {floorPlans.map(floor => (
          <option key={floor._id} value={floor._id}>{floor.name}</option>
        ))}
      </select>
      <button onClick={fetchRecommendations}>Get Recommendations</button>
      <ul>
        {recommendedRooms.map(room => (
          <li key={room._id}>{`Room: ${room.roomNumber}, Capacity: ${room.capacity}`}</li>
        ))}
      </ul>
    </div>
  );
};

export default MeetingRoomRecommendations;
