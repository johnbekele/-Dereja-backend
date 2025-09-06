import mongoose from 'mongoose';

const stopSchema = new mongoose.Schema({
  name: { type: String, required: true },
  lat: { type: Number, required: true },
  lng: { type: Number, required: true },
  code: { type: String }, // optional unique stop code
}, { timestamps: true });

export default mongoose.model('Stop', stopSchema);
