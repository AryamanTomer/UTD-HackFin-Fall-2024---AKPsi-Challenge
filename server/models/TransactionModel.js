import mongoose from "mongoose";
import { loadType } from "mongoose-currency";


// Transaction Schema: Tracks payments, donations, and fees
const transactionSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  amount: { type: Number, required: true },
  type: { type: String, enum: ['dues', 'eventFee', 'donation', 'peerToPeer'], required: true },
  status: { type: String, enum: ['pending', 'completed'], default: 'pending' },
  paymentMethod: { type: String, enum: ['PayPal', 'Stripe', 'Venmo'], required: true },
  installmentPlan: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});

export const Transaction = mongoose.model('Transaction', transactionSchema);