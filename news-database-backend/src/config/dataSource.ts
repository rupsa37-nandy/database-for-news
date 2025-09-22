import mongoose from "mongoose";

//async is required because mongoose.connect() is asynchronous and returns a Promise.
export const connectDB = async () => {
  try {
    //await makes your code wait until the connection is either successful or fails
    await mongoose.connect(process.env.MONGO_URI as string);
    console.log("--MongoDB is connected--");
  } catch (error) {
    console.log("MongoDB connection failed -> ", error);
  }
};