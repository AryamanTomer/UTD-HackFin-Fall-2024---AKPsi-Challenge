import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";

import { authenticateToken } from "./authMiddleware.js";
import authRouter from "./routers/AuthenticationRouter.js";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { User } from "./models/UserModel.js";
import { Dues } from "./models/DuesModel.js";
import { Transaction } from "./models/TransactionModel.js";
import { Budget } from "./models/BudgetModel.js";
import { Fundraising } from "./models/FundraisingModel.js";
import { Reminder } from "./models/ReminderModel.js";
import { Report } from "./models/ReportModel.js";
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet())
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin"}))
app.use(morgan("common"))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false}));
app.use(cors());
app.use("/auth", authRouter);
app.get("/profile", authenticateToken, async (req, res) => {
    try {
        const user = await User.findById(req.user.userId).select("-password");
        if (!user) return res.status(404).json({ error: "User not found" });

        res.json(user);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch profile" });
    }
});
app.get("/users", async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        res.status(500).send({ error: "Failed to retrieve users" });
    }
});

// Route to get the financial dashboard
app.get("/dashboard", async (req, res) => {
    try {
        const totalDues = await Dues.aggregate([{ $group: { _id: null, total: { $sum: "$amount" } } }]);
        const totalRevenue = await Transaction.aggregate([{ $group: { _id: null, total: { $sum: "$amount" } } }]);
        const totalFundraising = await Fundraising.aggregate([{ $group: { _id: null, total: { $sum: "$raisedAmount" } } }]);

        res.json({
            totalDues: totalDues[0]?.total || 0,
            totalRevenue: totalRevenue[0]?.total || 0,
            totalFundraising: totalFundraising[0]?.total || 0,
        });
    } catch (error) {
        res.status(500).send({ error: "Failed to fetch dashboard data" });
    }
});

// Route to create a new transaction (payment for dues, event fee, donation)
app.post("/transaction", async (req, res) => {
    try {
        const { userId, amount, type, paymentMethod } = req.body;
        const newTransaction = new Transaction({ user: userId, amount, type, paymentMethod });
        await newTransaction.save();
        res.status(201).json(newTransaction);
    } catch (error) {
        res.status(500).send({ error: "Failed to create transaction" });
    }
});

// Route to approve or reject expense (admin only)
app.put("/budget/:id/approve", async (req, res) => {
    const { id } = req.params;
    const { approvalStatus } = req.body; // 'approved' or 'rejected'
    try {
        const budget = await Budget.findById(id);
        if (budget) {
            budget.approvalStatus = approvalStatus;
            await budget.save();
            res.json(budget);
        } else {
            res.status(404).send({ error: "Budget not found" });
        }
    } catch (error) {
        res.status(500).send({ error: "Failed to approve/reject budget" });
    }
});

// Route to generate quarterly reports (admin only)
app.get("/reports/quarterly", async (req, res) => {
    try {
        const report = await Report.findOne({ type: "quarterly" }).sort({ dateGenerated: -1 });
        res.json(report);
    } catch (error) {
        res.status(500).send({ error: "Failed to fetch report" });
    }
});

app.get("/reminders/dues", async (req, res) => {
    try {
        const dueMembers = await Dues.find({ status: "pending" }).populate("member");
        dueMembers.forEach(member => {
            // Code for sending reminder email (using a service like nodemailer)
            console.log(`Sending reminder to: ${member.member.email}`);
        });
        res.send("Reminders sent");
    } catch (error) {
        res.status(500).send({ error: "Failed to send reminders" });
    }
});

app.put("/fundraising/:id", async (req, res) => {
    const { id } = req.params;
    const { goalAmount, raisedAmount } = req.body;
    try {
        const fundraising = await Fundraising.findById(id);
        if (fundraising) {
            fundraising.goalAmount = goalAmount;
            fundraising.raisedAmount = raisedAmount;
            fundraising.goalAchieved = fundraising.raisedAmount >= fundraising.goalAmount;
            await fundraising.save();
            res.json(fundraising);
        } else {
            res.status(404).send({ error: "Fundraising goal not found" });
        }
    } catch (error) {
        res.status(500).send({ error: "Failed to update fundraising" });
    }
});

// Route to view transactions (members only)
app.get("/transactions", async (req, res) => {
    const { userId } = req.query;
    try {
        const transactions = await Transaction.find({ user: userId });
        res.json(transactions);
    } catch (error) {
        res.status(500).send({ error: "Failed to retrieve transactions" });
    }
});

const PORT = process.env.PORT || 9000;
mongoose
    .connect(process.env.MONGO_URL)
    .then(async () => {
        app.listen(PORT, () => console.log(`Server Port: ${PORT}`));
        app.get('/budget_drafter', async (req, res) => {
            try{
                //call fetchBudgetData and store it in data
                const data = await fetchBudgetData();
                //send date
                res.send(data.response.candidates[0].content.parts[0].text);
            }catch(error){
                res.status(500).send({error: "Failed to fetch data"}); //handle err
            }
        })
    })
    .catch((error) => console.log(`${error} did not connect`));

    async function fetchBudgetData(){
        //new instance of gemini w api key
        const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GEMINI_API_KEY);
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        const prompt = "This is just a test, say hi";

    const result = await model.generateContent(prompt); 
    return result;  
    }