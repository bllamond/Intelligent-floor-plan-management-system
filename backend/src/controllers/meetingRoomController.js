import MeetingRoom from '../models/MeetingRoom.js';
import FloorPlan from '../models/FloorPlan.js';

// Get available meeting rooms based on capacity and availability
export const getAvailableMeetingRooms = async (req, res) => {
  // const { minCapacity } = req.query;
  // console.log(req.query);
  // try {
  //   console.log('reached')
  //   const availableRooms = await MeetingRoom.find({
  //     capacity: { $gte: minCapacity },
  //     availability: true,
  //   }).sort({ proximityScore: -1 }); // Sort by proximityScore
  //   console.log(availableRooms);
  //   res.json(availableRooms);
  // } catch (error) {
  //   res.status(500).json({ message: 'Error fetching meeting rooms', error });
  // }
//   try {
//     const availableRooms = await MeetingRoom.find({ availability: true });
//     res.status(200).json(availableRooms);
// } catch (error) {
//     res.status(500).json({ message: 'Error fetching available rooms.', error });
// }

const { floorId, minCapacity } = req.query;
console.log({'floorId': floorId, 'minCapacity' : minCapacity });
  try {
      const availableRooms = await MeetingRoom.find({
          availability: true,
          capacity: { $gte: minCapacity },
          ...(floorId ? { floorId } : {}), // Filter by floor if specified
      }).populate('floorId'); // Populate to get floor details

      res.json(availableRooms);
  } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
  }
};
// app.get('/api/meetingRooms/available', async (req, res) => {
//   const { floorId, minCapacity } = req.query;

//   try {
//       const availableRooms = await MeetingRoom.find({
//           availability: true,
//           capacity: { $gte: minCapacity },
//           ...(floorId ? { floorId } : {}), // Filter by floor if specified
//       }).populate('floorId'); // Populate to get floor details

//       res.json(availableRooms);
//   } catch (error) {
//       console.error(error);
//       res.status(500).json({ error: 'Internal Server Error' });
//   }
// });
// Book a meeting room
export const bookMeetingRoom = async (req, res) => {
  const { roomId } = req.body;
  try {
    const room = await MeetingRoom.findById(roomId);
    if (!room || !room.availability) {
      return res.status(400).json({ message: 'Meeting room not available' });
    }

    // Update room status
    room.availability = false;
    room.lastBookedAt = new Date();
    await room.save();

    res.json({ message: 'Meeting room booked successfully', room });
  } catch (error) {
    res.status(500).json({ message: 'Error booking meeting room', error });
  }
};

// Get recommended meeting rooms based on capacity, proximity, and last booking weightage
export const getRecommendedMeetingRoom = async (req, res) => {
  const { participants } = req.query;
  try {
    const recommendedRooms = await MeetingRoom.find({
      capacity: { $gte: participants },
      availability: true,
    })
      .sort({ proximityScore: -1, lastBookedAt: 1 }) // Sort by proximity and last booking time
      .limit(5); // Limit to top 5 suggestions

    res.json(recommendedRooms);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching recommendations', error });
  }
};
