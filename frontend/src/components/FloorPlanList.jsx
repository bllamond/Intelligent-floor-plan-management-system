import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './FloorPlanList.css'; // Import the CSS file for styling

const FloorPlanList = () => {
  const [floorPlans, setFloorPlans] = useState([]);
  const navigate = useNavigate();

  // Fetch the list of floor plans from the server
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
    // Navigate to the update page with the selected floor plan ID
    navigate(`/update-floorplan/${id}`);
  };

  const handleRemove = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/api/floorplans/${id}`, {
        method: 'DELETE'
      });
      if (response.ok) {
        setFloorPlans(floorPlans.filter(floorPlan => floorPlan._id !== id)); // Remove the floor plan from the list
        console.log('Floor plan removed successfully');
      } else {
        throw new Error('Error removing floor plan');
      }
    } catch (error) {
      console.error('Error removing floor plan:', error.message);
    }
  };

  return (
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
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FloorPlanList;
