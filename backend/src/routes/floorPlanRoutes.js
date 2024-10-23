import express from 'express';
import { getFloorPlans, createFloorPlan, updateFloorPlan, getFloorPlanById, deleteFloorPlanById, getChangesLog } from '../controllers/floorPlanController.js';

const router = express.Router();

console.log('reached route');
router.get('/', getFloorPlans);
router.post('/', createFloorPlan);
router.get('/:id', getFloorPlanById);
router.put('/:id', updateFloorPlan);
router.delete('/:id', deleteFloorPlanById);

router.get('/:id/changes', getChangesLog);

export default router;
