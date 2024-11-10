import axios from "axios";

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const api = axios.create({
  baseURL: `http://localhost:${process.env.PORT || 9000}`, // Use the PORT from .env or default to 9000
  headers: {
    "Content-Type": "application/json",
  },
});




export const createBudget = (budgetData) => api.post("/api/budget/create", budgetData);
export const createDues = (duesData) => api.post("/api/dues/create", duesData);
export const createFundraising = (fundraisingData) => api.post("/api/fundraising/create", fundraisingData);
export const createReminder = (reminderData) => api.post("/api/reminder/create", reminderData);
export const createReport = (reportData) => api.post("/api/report/create", reportData);
export const fetchUsers = () => api.get("/users");
export const fetchDashboardData = () => api.get("/dashboard");
export const createTransaction = (transactionData) => api.post("/transaction", transactionData);
export const approveBudget = (id, approvalStatus) => api.put(`/budget/${id}/approve`, { approvalStatus });
export const fetchQuarterlyReport = () => api.get("/reports/quarterly");
export const sendDueReminders = () => api.get("/reminders/dues");
export const updateFundraisingGoal = (id, data) => api.put(`/fundraising/${id}`, data);
export const fetchTransactions = (userId) => api.get("/transactions", { params: { userId } });
