import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const app = express();
const port = process.env.PORT || 7000

const corsOptions = {
    origin: true
}
app.get('/',(req, res) => {
    res.send("Hi, everything is good till now!");
})
// database connection
mongoose.set("strictQuery",false)

// middlewares
app.use(express.json());
app.use(cookieParser())
app.use(cors(corsOptions));


app.listen(port,()=>{
    console.log("server is running on port.. ",port);
})