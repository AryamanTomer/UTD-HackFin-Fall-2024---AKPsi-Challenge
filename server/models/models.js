import mongoose from "mongoose";
import { loadType } from "mongoose-currency";
const mongoose = require('mongoose');

// User Schema: Includes both admin and member profiles
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['admin', 'member'], required: true },
  duesPaid: { type: Boolean, default: false },
  paymentHistory: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Transaction' }],
  transactions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Transaction' }],
  peerToPeerPayments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Transaction' }],
  pendingAmount: { type: Number, default: 0 },
  healthScore: { type: Number, default: 100 }, // AI-determined metric
});

// Dues and Events Schema: Tracks dues and fees for events
const duesSchema = new mongoose.Schema({
  member: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  amount: { type: Number, required: true },
  dueDate: { type: Date, required: true },
  status: { type: String, enum: ['pending', 'paid'], default: 'pending' },
  remindersSent: { type: Number, default: 0 }, // Counter for automated reminders
});

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

// Budget Schema: For budget tracking and financial transparency
const budgetSchema = new mongoose.Schema({
  category: { type: String, required: true }, // e.g., 'Events', 'Fundraising'
  allocatedAmount: { type: Number, required: true },
  spentAmount: { type: Number, default: 0 },
  remainingAmount: { type: Number, default: function () { return this.allocatedAmount; } },
  lowBalanceReminderSent: { type: Boolean, default: false }, // for low-balance alerts
  approvalStatus: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
  lastUpdated: { type: Date, default: Date.now },
});

// Fundraising Schema: Tracks goals and sponsors for fundraising
const fundraisingSchema = new mongoose.Schema({
  goalAmount: { type: Number, required: true },
  raisedAmount: { type: Number, default: 0 },
  sponsors: [{ name: String, contribution: Number }],
  goalAchieved: { type: Boolean, default: false },
  deadline: { type: Date, required: true },
  contributors: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
});

// Report Schema: For generating and storing quarterly reports
const reportSchema = new mongoose.Schema({
  generatedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  type: { type: String, enum: ['quarterly', 'annual', 'eventProfitability'], required: true },
  dateGenerated: { type: Date, default: Date.now },
  reportData: { type: mongoose.Schema.Types.Mixed }, // Flexible data structure for various reports
  eventProfitability: { type: Number, default: 0 }, // Profitability metric for events
});

// Reminder Schema: For automated reminders
const reminderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  dueType: { type: String, enum: ['dues', 'eventFee', 'donation'], required: true },
  lastSent: { type: Date, default: Date.now },
  status: { type: String, enum: ['pending', 'sent'], default: 'pending' },
});

module.exports = {
  User: mongoose.model('User', userSchema),
  Dues: mongoose.model('Dues', duesSchema),
  Transaction: mongoose.model('Transaction', transactionSchema),
  Budget: mongoose.model('Budget', budgetSchema),
  Fundraising: mongoose.model('Fundraising', fundraisingSchema),
  Report: mongoose.model('Report', reportSchema),
  Reminder: mongoose.model('Reminder', reminderSchema),
};
