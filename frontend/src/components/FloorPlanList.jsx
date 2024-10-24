import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './FloorPlanList.css'; // Import the CSS file for styling
import MeetingRoomForm from './MeetingRoomForm';
import MeetingRoomBooking from './MeetingRoomBooking';
import MeetingRoomRecommendations from './MeetingRoomRecommendations';

const FloorPlanList = ({onViewChanges}) => {
  const [floorPlans, setFloorPlans] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFloorPlans = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/floorplans");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setFloorPlans(data); // Update state with fetched data
      } catch (error) {
        console.error('Error fetching floor plans:', error.message);
      }
    };

    fetchFloorPlans();
  }, []);

  const handleUpdate = (id) => {
    navigate(`/update-floorplan/${id}`);
  };

  const handleRemove = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/api/floorplans/${id}`, {
        method: 'DELETE'
      });
      if (response.ok) {
        setFloorPlans(floorPlans.filter(floorPlan => floorPlan._id !== id));
        console.log('Floor plan removed successfully');
      } else {
        throw new Error('Error removing floor plan');
      }
    } catch (error) {
      console.error('Error removing floor plan:', error.message);
    }
  };

  

  const handleViewChanges = (id) => {
    onViewChanges(id); // Trigger the view changes action from the parent
  };

  return (
    <>
    <div className="floorplan-list-container">
      <h2>Floor Plan List</h2>
      <ul className="floorplan-list">
        {floorPlans.map((floorPlan) => (
          <li key={floorPlan._id} className="floorplan-item">
            <div className="floorplan-info">
              <strong>{floorPlan.name}</strong>: {floorPlan.description}
            </div>
            <div className="floorplan-actions">
              <button className="update-btn" onClick={() => handleUpdate(floorPlan._id)}>Update</button>
              <button className="remove-btn" onClick={() => handleRemove(floorPlan._id)}>Remove</button>
              <button className="btn" onClick={() => handleViewChanges(floorPlan._id)}>View Changes history</button>
            </div>
          </li>
        ))}
      </ul>

        {/* <MeetingRoomBooking /> */}
    </div>
    <div className="floorplan-list-container">
        <h1>Meeting Room Management</h1>
        <MeetingRoomForm />
        {/* <MeetingRoomRecommendations/> */}
        <MeetingRoomBooking />
    </div>
    </>
  );
};

export default FloorPlanList;
