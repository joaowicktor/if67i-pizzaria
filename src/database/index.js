import mongoose from 'mongoose';
import { logger } from '../utils/logger.js';

const connect = async () => {
  try {
    const { connection } = await mongoose.connect(process.env.MONGODB_URI);
    logger.info(`Connected to MongoDB: ${connection.host}`);
  } catch (err) {
    logger.error(err);
  }
};

export default {
  connect,
};
