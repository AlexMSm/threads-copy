import mongoose from "mongoose";

let isConnected = false;

export const connectToDB = async () => {
  mongoose.set("strictQuery", true);
  if (!process.env.MONGOOSE_URL) return console.log("ONGOOSE_URL not found.");
  if (isConnected) return console.log("Connected to MongoDB");

  try {
    await mongoose.connect(process.env.MONGODB_URL);
    isConnected = true;
    console.log("Connected to MONGODB");
  } catch (error) {
    console.log(error);
  }
};
