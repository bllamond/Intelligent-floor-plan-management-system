// import mongoose from 'mongoose';

// const seatSchema = new mongoose.Schema({
//   seatNumber: {
//     type: Number,
//     required: true
//   },
//   occupied: {
//     type: Boolean,
//     default: false
//   }
// });

// const roomSchema = new mongoose.Schema({
//   roomNumber: {
//     type: Number,
//     required: true
//   },
//   capacity: {
//     type: Number,
//     required: true
//   },
//   booked: {
//     type: Boolean,
//     default: false
//   }
// });

// const floorPlanSchema = new mongoose.Schema({
//   name: {
//     type: String,
//     required: true
//   },
//   description: {
//     type: String,
//     default: ''
//   },
//   seats: [seatSchema],
//   rooms: [roomSchema],
//   version: { type: Number, default: 1 },
//   modifiedAt: { type: Date, default: Date.now },
//   createdBy: { 
//     type: mongoose.Schema.Types.ObjectId, 
//     ref: 'User', 
//     required: true 
//   },
//   modifiedBy: { 
//     type: mongoose.Schema.Types.ObjectId, 
//     ref: 'User', 
//     required: true 
//   },
// });

// const FloorPlan = mongoose.model('FloorPlan', floorPlanSchema);
// export default FloorPlan;


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
  },
  booked: {
    type: Boolean,
    default: false,
  },
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
    of: mongoose.Schema.Types.Mixed, // Can be used to store various types of changes
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
  changeLog: [changeLogSchema], // Array to store history of changes
});

const FloorPlan = mongoose.model('FloorPlan', floorPlanSchema);
export default FloorPlan;
