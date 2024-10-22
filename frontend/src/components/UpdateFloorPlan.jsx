import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './AddFloorPlan.css'; // Make sure to include styling if needed

const UpdateFloorPlan = () => {
  const { id } = useParams(); // Get the floor plan ID from the URL
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [seats, setSeats] = useState([]);
  const [rooms, setRooms] = useState([]);
  const navigate = useNavigate();

  // Fetch the floor plan details when component mounts
  useEffect(() => {
    const fetchFloorPlan = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/floorplans/${id}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();

        // Populate form fields with the fetched data
        setName(data.name);
        setDescription(data.description);
        setSeats(data.seats || []);
        setRooms(data.rooms || []);
      } catch (error) {
        console.error('Error fetching floor plan:', error.message);
      }
    };

    fetchFloorPlan();
  }, [id]);

  const handleSeatChange = (index, e) => {
    const updatedSeats = [...seats];
    updatedSeats[index] = { ...updatedSeats[index], [e.target.name]: e.target.value };
    setSeats(updatedSeats);
  };

  const handleRoomChange = (index, e) => {
    const updatedRooms = [...rooms];
    updatedRooms[index] = { ...updatedRooms[index], [e.target.name]: e.target.value };
    setRooms(updatedRooms);
  };

  const handleAddSeat = () => {
    setSeats([...seats, { seatNumber: '', occupied: false }]);
  };

  const handleAddRoom = () => {
    setRooms([...rooms, { roomNumber: '', capacity: '' }]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
  

  let currentFloorPlan;
  try {
    const response = await fetch(`http://localhost:5000/api/floorplans/${id}`);
    if (!response.ok) {
      throw new Error(`Error fetching floor plan: ${response.statusText}`);
    }
    currentFloorPlan = await response.json();
  } catch (error) {
    console.error('Error fetching current floor plan:', error.message);
    return; 
  }

  const updatedFloorPlanData = {
    name,
    description,
    seats,
    rooms,
    version: currentFloorPlan.version, 
    modifiedBy: "614a7c8e914c130e8c3c3c1f" 
  };

  try {
    const response = await fetch(`http://localhost:5000/api/floorplans/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedFloorPlanData),
    });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      console.log('Floor Plan Updated:', await response.json());
      navigate('/'); // Redirect to the home page after updating
    } catch (error) {
      console.error('Error updating floor plan:', error.message);
    }
  };

  return (
    <div className="add-floor-plan-container">
        <button className="back-button" onClick={() => navigate("/")}>Back to home</button>
      <h2>Update Floor Plan</h2>
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
          Update Floor Plan
        </button>
      </form>
    </div>
  );
};

export default UpdateFloorPlan;
