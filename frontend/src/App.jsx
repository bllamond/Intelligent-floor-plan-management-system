import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AddFloorPlan from './components/AddFloorPlan';
import Home from './components/Home';
import UpdateFloorPlan from './components/UpdateFloorPlan';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path="/add-floorplan" element={<AddFloorPlan />} />
        <Route path="/update-floorplan/:id" element={<UpdateFloorPlan />} />
      </Routes>
    </Router>
  );
};

export default App;
