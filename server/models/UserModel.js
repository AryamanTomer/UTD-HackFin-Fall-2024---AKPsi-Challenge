import mongoose from "mongoose";
import { loadType } from "mongoose-currency";
const userSchema = new mongoose.Schema(
    {
        name: { 
            type: String, 
            required: true 
        },
        email: { 
            type: String, 
            required: true, 
            unique: true 
        },
        password: { 
            type: String, 
            required: true 
        },
        role: { 
            type: String, 
            enum: ['admin', 'member'], 
            required: true 
        },
        duesPaid: { 
            type: Boolean, 
            default: false 
        },
        paymentHistory: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Transaction' }],
        transactions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Transaction' }],
        peerToPeerPayments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Transaction' }],
        pendingAmount: { type: Number, default: 0 },
        healthScore: { type: Number, default: 100 }, // AI-determined metric
  });
  
export const User = mongoose.model('User', userSchema);