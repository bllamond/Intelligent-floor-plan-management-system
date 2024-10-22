import React, { useEffect, useState } from 'react';
import { getFloorPlans, createFloorPlan } from '../services/apiService';

function FloorPlanManager() {
  const [floorPlans, setFloorPlans] = useState([]);
  const [newPlan, setNewPlan] = useState('');

  useEffect(() => {
    getFloorPlans().then(response => setFloorPlans(response.data));
  }, []);

  const handleCreate = () => {
    createFloorPlan({ name: newPlan, data: {} }).then(response => {
      setFloorPlans([...floorPlans, response.data]);
      setNewPlan('');
    });
  };

  return (
    <div>
      <h1>Floor Plans</h1>
      <ul>
        {floorPlans.map(plan => <li key={plan._id}>{plan.name}</li>)}
      </ul>
      <input value={newPlan} onChange={(e) => setNewPlan(e.target.value)} placeholder="New Floor Plan Name" />
      <button 
      // onClick={handleCreate}
      >Create Floor Plan</button>
    </div>
  );
}

export default FloorPlanManager;
