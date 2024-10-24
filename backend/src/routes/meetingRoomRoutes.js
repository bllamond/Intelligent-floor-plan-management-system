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
  // conosle.log()
  try {
    const meetingRoom = new MeetingRoom({ roomNumber, capacity, floorId: floorPlanId });
    await meetingRoom.save();

    // Update the FloorPlan to include the new meeting room
    await FloorPlan.findByIdAndUpdate(floorPlanId, { $push: { meetingRooms: meetingRoom._id } });
    console.log(meetingRoom);
    res.status(201).json(meetingRoom);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});


router.post('/book', async (req, res) => {
  const { roomId } = req.body;
  try {
      const room = await MeetingRoom.findById(roomId);
      if (room) {
          room.availability = false; // Mark as booked
          await room.save();
          res.status(200).json({ message: 'Room booked successfully.' });
      } else {
          res.status(404).json({ message: 'Room not found.' });
      }
  } catch (error) {
      res.status(500).json({ message: 'Error booking room.', error });
  }
});

// router.get('/recommendations', async (req, res) => {
//   const { floorId, participants } = req.query;

//   try {
//       // Fetch meeting rooms based on floor and participants
//       const recommendedRooms = await MeetingRoom.find({
//           availability: true,
//           capacity: { $gte: participants },
//           // Add any other necessary conditions here
//           ...(floorId ? { floorId } : {}),
//       }).limit(3); // Limit to top 3 recommendations

//       res.json(recommendedRooms);
//   } catch (error) {
//       console.error(error);
//       res.status(500).json({ error: 'Internal Server Error' });
//   }
// });

router.get('/recommendations', async (req, res) => {
  const { floorId, participants } = req.query;

  try {
      const query = {
          availability: true,
          capacity: { $gte: participants },
          ...(floorId ? { floorId } : {}),
      };

      // Fetch matching rooms
      let recommendedRooms = await MeetingRoom.find(query);

      // Score the rooms based on additional criteria
      recommendedRooms = recommendedRooms.map(room => {
          const score = calculateProximityScore(room) + getLastBookingWeightage(room);
          return { ...room.toObject(), score }; // Convert to plain object and add score
      });

      // Sort rooms based on score and limit to top 3
      recommendedRooms.sort((a, b) => b.score - a.score);
      res.json(recommendedRooms.slice(0, 1)); // Return top 3 recommended rooms
  } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Function to calculate proximity score
function calculateProximityScore(room) {
  // Placeholder logic for proximity scoring
  return room.proximityScore; // Return the room's existing proximity score
}

// Function to get weightage based on last booking
function getLastBookingWeightage(room) {
  if (!room.lastBookedAt) return 0; // No booking history
  const lastBookedDaysAgo = (Date.now() - new Date(room.lastBookedAt)) / (1000 * 60 * 60 * 24);
  return lastBookedDaysAgo < 30 ? 5 : 0; // Boost for recent bookings
}

// Route to get available meeting rooms based on capacity
router.get('/available', getAvailableMeetingRooms);

// Route to book a meeting room
// router.post('/book', bookMeetingRoom);

// Route to get recommended meeting rooms
// router.get('/recommend', getRecommendedMeetingRoom);

export default router;
