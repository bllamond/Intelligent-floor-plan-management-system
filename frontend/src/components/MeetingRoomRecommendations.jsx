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
    const [floorPlans, setFloorPlans] = useState([]);
    const [participants, setParticipants] = useState(0);
    const [recommendedRooms, setRecommendedRooms] = useState([]);
    const [selectedFloor, setSelectedFloor] = useState("");

    // Fetching floor plans on component mount
    useEffect(() => {
        const fetchFloorPlans = async () => {
            try {
                const response = await axios.get("http://localhost:5000/api/floorplans");
                setFloorPlans(response.data);
            } catch (error) {
                console.error('Error fetching floor plans:', error);
            }
        };
        fetchFloorPlans();
    }, []);

    // Fetch recommendations whenever selectedFloor or participants change
    useEffect(() => {
        const fetchRecommendations = async () => {
            if (selectedFloor && participants > 0) {
                try {
                    const response = await axios.get('http://localhost:5000/api/meetingRooms/recommendations', {
                        params: { floorId: selectedFloor, participants }
                    });
                    setRecommendedRooms(response.data);
                } catch (error) {
                    console.error('Error fetching recommendations:', error);
                }
            }
        };

        fetchRecommendations();
    }, [selectedFloor, participants]);

    return (
        <div>
            <h2>Recommend Meeting Rooms</h2>
            <input
                type="number"
                placeholder="Number of Participants"
                value={participants}
                onChange={(e) => setParticipants(e.target.value)}
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
            <h3>Top 3 Recommended Rooms</h3>
            <ul>
                {recommendedRooms.map(room => (
                    <li key={room._id}>
                        Room {room.roomNumber} - Capacity: {room.capacity} - Score: {room.score}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default MeetingRoomRecommendations;
