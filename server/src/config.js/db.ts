// config/db.ts
import mongoose from 'mongoose';

const connectDB = async (): Promise<void> => {
  const uri = process.env.MONGODB_URI;

  if (!uri) {
    throw new Error('MONGO_URI is not defined in environment variables');
  }

  try {
    console.log("Starting connection")
    const conn = await mongoose.connect(uri);
    console.log(`Whatsapp MongoDB connected: ${conn.connection.host}`);
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    console.error('MongoDB connection failed:', message);
    process.exit(1);
  }
};

export default connectDB;