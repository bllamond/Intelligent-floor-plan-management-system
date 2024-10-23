// models/MeetingRoom.js
const mongoose = require('mongoose');

const MeetingRoomSchema = new mongoose.Schema({
  roomNumber: { type: String, required: true },
  floor: { type: mongoose.Schema.Types.ObjectId, ref: 'FloorPlan', required: true },
  capacity: { type: Number, required: true },
  availability: { type: Boolean, default: true },
  lastBookingTime: { type: Date },
});

module.exports = mongoose.model('MeetingRoom', MeetingRoomSchema);
