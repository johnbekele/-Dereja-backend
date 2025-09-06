import mongoose from 'mongoose';

const subscriptionSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  type: { 
    type: String, 
    enum: ['monthly', 'quarterly', 'yearly'], 
    required: true 
  },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  status: { type: String, enum: ['active','expired','cancelled'], default: 'active' },
}, { timestamps: true });

export default mongoose.model('Subscription', subscriptionSchema);
