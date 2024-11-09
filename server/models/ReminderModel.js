import mongoose from "mongoose";
import { loadType } from "mongoose-currency";


// Reminder Schema: For automated reminders
const reminderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  dueType: { type: String, enum: ['dues', 'eventFee', 'donation'], required: true },
  lastSent: { type: Date, default: Date.now },
  status: { type: String, enum: ['pending', 'sent'], default: 'pending' },
});

export const Reminder = mongoose.model('Reminder', reminderSchema);
