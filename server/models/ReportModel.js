import mongoose from "mongoose";
import { loadType } from "mongoose-currency";


// Report Schema: For generating and storing quarterly reports
const reportSchema = new mongoose.Schema({
    generatedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    type: { type: String, enum: ['quarterly', 'annual', 'eventProfitability'], required: true },
    dateGenerated: { type: Date, default: Date.now },
    reportData: { type: mongoose.Schema.Types.Mixed }, // Flexible data structure for various reports
    eventProfitability: { type: Number, default: 0 }, // Profitability metric for events
  });
  
export const Report = mongoose.model('Report', reportSchema)
    