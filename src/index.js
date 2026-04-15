import dotenv from 'dotenv';
import express from "express";
import authRoute from './routes/authroute.js';


dotenv.config({
    path: "./.env"
});

const app = express();
const PORT = process.env.PORT || 3000;

app.get('/',(req, res) => {
    res.send('Server is running');
});

app.use(express.json());

app.use('/api/auth',authRoute);
app.listen(PORT,() => {
    console.log(`Server started on http://localhost:${PORT}`);
});