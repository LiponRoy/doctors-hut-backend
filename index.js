import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import DatabaseConnect from "./DatabaseConnect.js";
dotenv.config();
import authRoutes from "./Routes/authRoutes.js";
import userRoute from "./Routes/userRoute.js";

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
// Routes
app.use("/api/v1/auth",authRoutes);
app.use("/api/v1/user",userRoute);

app.listen(port,()=>{
    DatabaseConnect();
    console.log("server is running on port.. ",port);
})