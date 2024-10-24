import express from 'express';
import MeetingRoom from '../models/MeetingRoom.js';

const router = express.Router();

// Get meeting room recommendations based on floor
router.get('/', async (req, res) => {
  const { floorId } = req.query; // Optional parameter

  try {
    const query = floorId ? { floorPlan: floorId, availability: true } : { availability: true };
    const availableRooms = await MeetingRoom.find(query).populate('floorPlan');

    const recommendedRooms = availableRooms.sort((a, b) => {
      // Custom sorting logic can be added here
      return a.capacity - b.capacity; // Example: sort by capacity
    });

    res.json(recommendedRooms);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
