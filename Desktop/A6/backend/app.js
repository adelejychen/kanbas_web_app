import express from "express";
import cors from "cors";
import userRouter from './routes/userRoutes.js';
import mongoose from "mongoose";
mongoose.connect('mongodb://localhost/mydatabase');
mongoose.connection.on('connected', () => {
    console.log('Connected to MongoDB');
});

mongoose.connection.on('error', (err) => {
    console.log('Error connecting to MongoDB:', err);
});

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/users', userRouter);



app.listen(4000, () => {
    console.log('Server is running on port 4000');
});


