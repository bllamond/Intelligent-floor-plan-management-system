import mongoose from 'mongoose';

const meetingRoomSchema = new mongoose.Schema({
  roomNumber: {
    type: Number,
    required: true,
  },
  capacity: {
    type: Number,
    required: true,
  },
  availability: {
    type: Boolean,
    default: true,
  },
  lastBookedAt: {
    type: Date,
  },
  proximityScore: {
    type: Number,
    default: 0,
  },
  floorPlan: {  // Reference to the corresponding FloorPlan
    type: mongoose.Schema.Types.ObjectId,
    ref: 'FloorPlan',
  },
});

const MeetingRoom = mongoose.model('MeetingRoom', meetingRoomSchema);
export default MeetingRoom;
