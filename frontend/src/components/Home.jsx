import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import FloorPlanList from './FloorPlanList';
import './Home.css'; 

const Home = () => {
    const navigate = useNavigate();
    
    const [changeLog, setChangeLog] = useState([]);
  const [showChangeLog, setShowChangeLog] = useState(false);

  const handleViewChanges = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/api/floorplans/${id}/changes`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setChangeLog(data);
      setShowChangeLog(true);
    } catch (error) {
      console.error('Error fetching change log:', error.message);
    }
  };
    const handleCloseChangeLog = () => {
        setShowChangeLog(false);
      };

    return (
<div className={`home-container ${showChangeLog ? 'overlay-active' : ''}`}>
    <div className='head'>
        <h1>Floor Plan Management System</h1>
        <button className="added-button" onClick={() => navigate('/add-floorplan')}>
            Add New Floor Plan
        </button>
    </div>

    <FloorPlanList onViewChanges={handleViewChanges} />

    {showChangeLog && (
        <div className="changelog-modal">
            <h3>Change Log</h3>
            <ul>
                {changeLog.map((change, index) => (
                    <li key={index}>
                        <strong>Modified At:</strong> {new Date(change.modifiedAt).toLocaleString()}<br />
                        <strong>Modified By:</strong> {change.modifiedBy}<br />
                        <strong>Changes:</strong> {JSON.stringify(change.changes)}
                    </li>
                ))}
            </ul>
            <button onClick={handleCloseChangeLog}>Close</button>
        </div>
    )}
</div>

    );
};

export default Home;
