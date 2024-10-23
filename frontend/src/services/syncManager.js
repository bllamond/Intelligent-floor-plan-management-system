// syncManager.js
import { getFloorPlans, deleteFloorPlan } from './indexedDB';

export const syncFloorPlans = async () => {
  const offlinePlans = await getFloorPlans();

  for (const plan of offlinePlans) {
    try {
      const response = await fetch('http://localhost:5000/api/floorplans', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(plan),
      });

      if (response.ok) {
        await deleteFloorPlan(plan._id);
        console.log(`Floor plan ${plan._id} synced successfully.`);
      }
    } catch (error) {
      console.error(`Failed to sync floor plan ${plan._id}:`, error);
    }
  }
};
