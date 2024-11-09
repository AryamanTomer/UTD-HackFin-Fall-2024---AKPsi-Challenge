import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
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



const PORT = process.env.PORT || 9000;
mongoose
    .connect(process.env.MONGO_URL)
    .then(async () => {
        app.listen(PORT, () => console.log(`Server Port: ${PORT}`))
    })
    .catch((error) => console.log(`${error} did not connect`));