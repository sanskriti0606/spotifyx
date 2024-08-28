import mongoose from 'mongoose';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
    //   useNewUrlParser: true,
    //   useUnifiedTopology: true,
    });
    console.log(' MongoDB connected for Spotify-themed app')
  } catch (err) {
    console.error(' MongoDB connection error:', err)
    // process.exit(1); 
  }
};

export default connectDB;
