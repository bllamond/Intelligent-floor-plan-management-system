import mongoose from 'mongoose';

const seatSchema = new mongoose.Schema({
  seatNumber: {
    type: Number,
    required: true,
  },
  occupied: {
    type: Boolean,
    default: false,
  },
});

const roomSchema = new mongoose.Schema({
  roomNumber: {
    type: Number,
    required: true,
  },
  capacity: {
    type: Number,
    required: true,
  }
});

const changeLogSchema = new mongoose.Schema({
  modifiedAt: {
    type: Date,
    default: Date.now,
  },
  modifiedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  changes: {
    type: Map,
    of: mongoose.Schema.Types.Mixed,
  },
});

const floorPlanSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    default: '',
  },
  seats: [seatSchema],
  rooms: [roomSchema],
  meetingRooms: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'MeetingRoom',
    },
  ],

  version: { 
    type: Number, 
    default: 1 
  },
  modifiedAt: { 
    type: Date, 
    default: Date.now 
  },
  createdBy: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  modifiedBy: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  changeLog: [changeLogSchema], 
});

const FloorPlan = mongoose.model('FloorPlan', floorPlanSchema);
export default FloorPlan;
