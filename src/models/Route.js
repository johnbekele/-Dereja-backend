import mongoose from 'mongoose';

const routeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  vehicleType: { type: String, enum: ['Bus', 'Minibus', 'Tram'], required: true },
  stops: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Stop' }], // route path
  code: { type: String }, // optional route code
}, { timestamps: true });

export default mongoose.model('Route', routeSchema);
