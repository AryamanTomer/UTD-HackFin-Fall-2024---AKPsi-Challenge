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

app.post('/api/budget/create', async (req, res) => {
    try {
      const { category, allocatedAmount, spentAmount, lowBalanceReminderSent, approvalStatus } = req.body;
      const remainingAmount = allocatedAmount - spentAmount;
  
      const budget = new Budget({
        category,
        allocatedAmount,
        spentAmount,
        remainingAmount,
        lowBalanceReminderSent,
        approvalStatus,
      });
  
      await budget.save();
      res.status(201).json({ message: 'Budget created successfully', data: budget });
    } catch (error) {
      res.status(500).json({ message: 'Error creating budget', error });
    }
  });

app.post('/api/dues/create', async (req, res) => {
    try {
      const { member, amount, dueDate, status } = req.body;
  
      const dues = new Dues({
        member,
        amount,
        dueDate,
        status,
      });
  
      await dues.save();
      res.status(201).json({ message: 'Dues created successfully', data: dues });
    } catch (error) {
      res.status(500).json({ message: 'Error creating dues', error });
    }
  });
  app.get('/api/dues', async (req, res) => {
    try {
      const dues = await Dues.find();
      res.status(200).json({ message: 'Dues retrieved successfully', data: dues });
    } catch (error) {
      res.status(500).json({ message: 'Error retrieving dues', error });
    }
  });
  app.get('/api/dues/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const due = await Dues.findById(id);
  
      if (!due) {
        return res.status(404).json({ message: 'Dues not found' });
      }
  
      res.status(200).json({ message: 'Due retrieved successfully', data: due });
    } catch (error) {
      res.status(500).json({ message: 'Error retrieving due', error });
    }
  });
  app.delete('/api/dues/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const due = await Dues.findByIdAndDelete(id);
  
      if (!due) {
        return res.status(404).json({ message: 'Dues not found' });
      }
  
      res.status(200).json({ message: 'Dues deleted successfully', data: due });
    } catch (error) {
      res.status(500).json({ message: 'Error deleting due', error });
    }
  });
app.post('/api/fundraising/create', async (req, res) => {
    try {
      const { goalAmount, raisedAmount, sponsors, deadline, contributors } = req.body;
  
      const fundraising = new Fundraising({
        goalAmount,
        raisedAmount,
        sponsors,
        goalAchieved: raisedAmount >= goalAmount,
        deadline,
        contributors,
      });
  
      await fundraising.save();
      res.status(201).json({ message: 'Fundraising campaign created successfully', data: fundraising });
    } catch (error) {
      res.status(500).json({ message: 'Error creating fundraising campaign', error });
    }
  });

app.post('/api/reminder/create', async (req, res) => {
    try {
      const { user, dueType, lastSent, status } = req.body;
  
      const reminder = new Reminder({
        user,
        dueType,
        lastSent,
        status,
      });
  
      await reminder.save();
      res.status(201).json({ message: 'Reminder created successfully', data: reminder });
    } catch (error) {
      res.status(500).json({ message: 'Error creating reminder', error });
    }
  });

app.post('/api/report/create', async (req, res) => {
    try {
      const { generatedBy, type, reportData, eventProfitability } = req.body;
  
      const report = new Report({
        generatedBy,
        type,
        reportData,
        eventProfitability,
      });
  
      await report.save();
      res.status(201).json({ message: 'Report created successfully', data: report });
    } catch (error) {
      res.status(500).json({ message: 'Error creating report', error });
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

app.post('/api/budget_drafter', async (req, res) => {
    try{
        const { capital,insurance, fees, outreach, brotherhood, charity, rushEvents } = req.body;
        const categories = {
            capital,
            insurance,
            fees,
            outreach,
            brotherhood,
            charity,
            rushEvents
          };
        //call fetchBudgetData and store it in data
        const data = await fetchBudgetData(categories);
        //send date
        res.send(data.response.candidates[0].content.parts[0].text);
    }catch(error){
        res.status(500).send({error: "Failed to fetch data"}); //handle err
    }
})

const PORT = process.env.PORT || 9000;
mongoose
    .connect(process.env.MONGO_URL)
    .then(async () => {
        app.listen(PORT, () => console.log(`Server Port: ${PORT}`));
    })
    .catch((error) => console.log(`${error} did not connect`));

    async function fetchBudgetData(categories){
        //new instance of gemini w api key
        const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GEMINI_API_KEY);
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        const prompt = `You are a financial advisor for a frat, they have ${categories.capital} for the school year, in addition to that they have to pay ${categories.insurance} for insurance  and ${categories.fees} in fees
        they have ranked 4 categories they want to spend the capital on 1-5 1 being most important 5 being least important, here are the ratings
        Outreach: ${categories.outreach}, 
        Brotherhood: ${categories.brotherhood}, 
        Charity: ${categories.charity}, 
        RushEvents: ${categories.rushEvents} 
        based on this information come up with a budget that allocates capital to these resources based on their ratings, include the insurance and fees in your output. make the output a javascript object format with no additional text, just the required output if there is any amount left over add that as well, also dont add any desctiptions ONLY SEND IT AS A JAVASCRIPT OBJECT NO JSON `;
        console.log(`${categories.insurance}`)
    const result = await model.generateContent(prompt); 
    return result;  
    }