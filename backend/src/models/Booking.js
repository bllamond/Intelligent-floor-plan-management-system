import mongoose from 'mongoose';

const BookingSchema = new mongoose.Schema({
    roomId: { type: mongoose.Schema.Types.ObjectId, ref: 'Room' },
    bookedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    startTime: { type: Date, required: true },
    endTime: { type: Date, required: true },
    participants: { type: Number, required: true }
  });
  

  export default mongoose.model('Booking', BookingSchema);