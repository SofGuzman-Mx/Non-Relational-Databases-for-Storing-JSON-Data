import express from 'express';
import 'dotenv/config';
import connectDB from './config/db.js';
import mainRouter from './routes/index.js';

// Connect to Database
connectDB();

const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// Main API routes
app.use('/api', mainRouter);


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});