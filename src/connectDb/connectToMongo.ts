import mongoose from "mongoose";
import { dbUrl } from "../utils/constant";

export const connectToMongo = async () => {
  try {
    await mongoose.connect(dbUrl as string);
    mongoose.connection.db.collection('users').updateMany({}, [{ $set: { id: "$_id" } }, { $unset: "_id" }])
    mongoose.connection.db.collection('students').updateMany({}, [{ $set: { id: "$_id" } }, { $unset: "_id" }])
    mongoose.connection.db.collection('subjects').updateMany({}, [{ $set: { id: "$_id" } }, { $unset: "_id" }])
    console.log(`Successfully Connected to ${dbUrl} `);
  } catch (error) {
    console.log((error as Error).message);
  }
};
