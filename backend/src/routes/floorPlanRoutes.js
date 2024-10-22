import express from 'express';
import { getFloorPlans, createFloorPlan, updateFloorPlan, getFloorPlanById, deleteFloorPlanById } from '../controllers/floorPlanController.js';

const router = express.Router();

console.log('reached route');
router.get('/', getFloorPlans);
router.post('/', createFloorPlan);
router.get('/:id', getFloorPlanById);
router.put('/:id', updateFloorPlan); // Conflict resolution logic will be handled here
router.delete('/:id', deleteFloorPlanById);

export default router;
