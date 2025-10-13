import mongoose from 'mongoose';
//Import the dotenv library to load environment variables
import 'dotenv/config';

const connectDB = async () => {
    try {
        // Use the connection string from your .env file
        const conn = await mongoose.connect(process.env.MONGODB_URI);
        console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Error: ${error.message}`);
        // Exit process with failure
        process.exit(1);
    }
};

export default connectDB;

