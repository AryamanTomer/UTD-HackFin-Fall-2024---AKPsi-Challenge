import mongoose from "mongoose";
import { loadType } from "mongoose-currency";

const duesSchema = new mongoose.Schema({
  member: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  amount: { 
    type: Number, 
    required: true 
  },
  dueDate: { 
    type: Date, 
    required: true 
  },
  status: { 
    type: String, 
    enum: ["pending", "paid"], 
    default: "pending" 
  },
  remindersSent: { 
    type: Number, 
    default: 0 
  }, // Counter for automated reminders
});
export const Dues = mongoose.model('Dues', duesSchema);