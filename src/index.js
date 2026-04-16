import dotenv from 'dotenv';
import express from "express";
import authRoute from './routes/authroute.js';
import mongoose from 'mongoose';


dotenv.config({
    path: "./.env"
});

const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI)
.then(()=>{
    console.log("✅MongoDB Connected successfully");
})
.catch((error)=>{
    console.error("Error connecting to MongoDB:",error);
});

app.use('/api/auth',authRoute);
app.listen(PORT,() => {
    console.log(`Server started on http://localhost:${PORT}`);
});