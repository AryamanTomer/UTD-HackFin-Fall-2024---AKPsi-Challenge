import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import {GoogleGenerativeAI} from "@google/generative-ai";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";

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