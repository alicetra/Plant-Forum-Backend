import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()

try {
    // put mongoose connection as early as you can even before the express
    const m = await mongoose.connect(process.env.DB_URI);
    console.log(m.connection.readyState === 1 ? 'MongoDB connected!' : 'MongoDB failed to connect');
  } catch (err) {
    console.error(err);
  }
