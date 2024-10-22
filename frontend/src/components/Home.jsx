import React from 'react';
import { useNavigate } from 'react-router-dom';
import FloorPlanList from './FloorPlanList';
import './Home.css'; // Import the CSS file for styling

const Home = () => {
    const navigate = useNavigate();
    
    return (
        <div className="home-container">
            <div className='head'>
            <h1>Floor Plan Management System</h1>
            <button className="added-button" onClick={() => navigate('/add-floorplan')}>
                Add New Floor Plan
            </button>
            </div>

            <FloorPlanList />
        </div>
    );
};

export default Home;
