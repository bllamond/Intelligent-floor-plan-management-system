// AvailableRooms.jsx

import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AvailableRooms = () => {
    const [availableRooms, setAvailableRooms] = useState([]);

    useEffect(() => {
        const fetchAvailableRooms = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/meetingRooms/available');
                setAvailableRooms(response.data);
            } catch (error) {
                console.error('Error fetching available rooms:', error);
            }
        };

        fetchAvailableRooms();
    }, []);

    return (
        <div>
            <h2>Available Meeting Rooms</h2>
            <ul>
                {availableRooms.map(room => (
                    <li key={room._id}>
                        Room {room.roomNumber} - Capacity: {room.capacity}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default AvailableRooms;
