import mongoose from "mongoose";
import { dbUrl } from "../utils/constant";

export const connectToMongo = async () => {
  try {
    await mongoose.connect(dbUrl as string);
    console.log(`Successfully Connected to ${dbUrl} `);
  } catch (error) {
    console.log((error as Error).message);
  }
};
