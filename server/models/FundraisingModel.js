import mongoose from "mongoose";
import { loadType } from "mongoose-currency";
const fundraisingSchema = new mongoose.Schema({
    goalAmount: { type: Number, required: true },
    raisedAmount: { type: Number, default: 0 },
    sponsors: [{ name: String, contribution: Number }],
    goalAchieved: { type: Boolean, default: false },
    deadline: { type: Date, required: true },
    contributors: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  });
  
export const Fundraising = mongoose.model('Fundraising', fundraisingSchema);
  