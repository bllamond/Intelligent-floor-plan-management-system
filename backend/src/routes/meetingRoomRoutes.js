import express from 'express';
import {
  getAvailableMeetingRooms,
  bookMeetingRoom,
  getRecommendedMeetingRoom,
} from '../controllers/meetingRoomController.js';


import MeetingRoom from '../models/MeetingRoom.js';
import FloorPlan from '../models/FloorPlan.js';

const router = express.Router();
router.post('/', async (req, res) => {
  const { roomNumber, capacity, floorPlanId } = req.body;

  try {
    const meetingRoom = new MeetingRoom({ roomNumber, capacity, floorPlan: floorPlanId });
    await meetingRoom.save();

    // Update the FloorPlan to include the new meeting room
    await FloorPlan.findByIdAndUpdate(floorPlanId, { $push: { meetingRooms: meetingRoom._id } });

    res.status(201).json(meetingRoom);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});


// Route to get available meeting rooms based on capacity
router.get('/available', getAvailableMeetingRooms);

// Route to book a meeting room
router.post('/book', bookMeetingRoom);

// Route to get recommended meeting rooms
router.get('/recommend', getRecommendedMeetingRoom);

export default router;
