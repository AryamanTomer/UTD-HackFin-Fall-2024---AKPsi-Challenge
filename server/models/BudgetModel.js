import mongoose from "mongoose";
import { loadType } from "mongoose-currency";

const budgetSchema = new mongoose.Schema({
    category: { type: String, required: true }, // e.g., 'Events', 'Fundraising'
    allocatedAmount: { type: Number, required: true },
    spentAmount: { type: Number, default: 0 },
    remainingAmount: { type: Number, default: function () { return this.allocatedAmount; } },
    lowBalanceReminderSent: { type: Boolean, default: false }, // for low-balance alerts
    approvalStatus: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
    lastUpdated: { type: Date, default: Date.now },
  });
  
export const Budget = mongoose.model('Budget', budgetSchema);


