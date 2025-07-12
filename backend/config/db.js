import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB Atlass connected successfully!");
  } catch (error) {
    console.error(`error getting while mongoDB connection: ${error}`);
    process.exit(1);
  }
};
