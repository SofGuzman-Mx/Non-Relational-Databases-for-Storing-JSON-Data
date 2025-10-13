import express from 'express';
import 'dotenv/config'; 
import connectDB from './config/db.js';
import mainRouter from './routes/index.js';

connectDB();

const app = express();

// Middleware para parsear JSON
app.use(express.json());

// Rutas principales de la API
app.use('/api', mainRouter);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
