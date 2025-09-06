import mongoose from 'mongoose';
import dotenv from 'dotenv';
import logger from '../utils/logger.js';

dotenv.config();

const connectDB = async () => {
  try {
    logger.log('Connecting to URL:', process.env.MONGODB_URI);
    await mongoose.connect(process.env.MONGODB_URI);
    logger.log('MongoDB connected successfully');
  } catch (error) {
    logger.error('MongoDB connection error:', error.message);
    process.exit(1);
  }
};

export default connectDB;
