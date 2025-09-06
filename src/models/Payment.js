import mongoose from 'mongoose';

const paymentSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  ticket: { type: mongoose.Schema.Types.ObjectId, ref: 'Ticket' },
  subscription: { type: mongoose.Schema.Types.ObjectId, ref: 'Subscription' },
  amount: { type: Number, required: true },
  method: { type: String, enum: ['card','mobile-money','paypal'], required: true },
  status: { type: String, enum: ['pending','completed','failed'], default: 'pending' },
  transactionId: { type: String }, // optional external transaction reference
}, { timestamps: true });

export default mongoose.model('Payment', paymentSchema);
