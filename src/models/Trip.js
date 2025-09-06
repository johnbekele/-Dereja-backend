import mongoose from 'mongoose';

const tripSchema = new mongoose.Schema({
  route: { type: mongoose.Schema.Types.ObjectId, ref: 'Route', required: true },
  startTime: { type: String, required: true }, // HH:mm format
  endTime: { type: String, required: true },
  days: [{ type: String, enum: ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'] }],
  vehicleId: { type: String }, // optional live vehicle tracking
}, { timestamps: true });

export default mongoose.model('Trip', tripSchema);
