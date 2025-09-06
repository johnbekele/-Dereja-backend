import mongoose from 'mongoose';

const ticketSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  trip: { type: mongoose.Schema.Types.ObjectId, ref: 'Trip', required: true },
  type: { 
    type: String, 
    enum: ['one-ride', 'multi-ride', 'monthly'], 
    required: true 
  },
  price: { type: Number, required: true },
  status: { type: String, enum: ['active','used','expired'], default: 'active' },
  validFrom: { type: Date, required: true },
  validTo: { type: Date, required: true }
}, { timestamps: true });

export default mongoose.model('Ticket', ticketSchema);
