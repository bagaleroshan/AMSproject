import { Response } from "express";
import mongoose from "mongoose";
import { dbUrl } from "./constant";

const successResponseData = (
  res: Response,
  message: string = "Successfully Completed",
  statusCode: number = 200,
  result: any,
  token?: string
) => {
  mongoose.connect(dbUrl as string);
  mongoose.connection.db
    .collection("subjects")
    .updateMany({}, [{ $set: { id: "$_id" } }]);
  mongoose.connection.db
    .collection("users")
    .updateMany({}, [{ $set: { id: "$_id" } }]);
  mongoose.connection.db
    .collection("students")
    .updateMany({}, [{ $set: { id: "$_id" } }]);
  mongoose.connection.db
    .collection("groups")
    .updateMany({}, [{ $set: { id: "$_id" } }]);
  mongoose.connection.db
    .collection("attendances")
    .updateMany({}, [{ $set: { id: "$_id" } }]);
  if (token) {
    return res.status(statusCode).json({
      success: true,
      message: message,
      result: result,
      token: token,
    });
  }
  return res.status(statusCode).json({
    success: true,
    message: message,
    result: result,
  });
};
export default successResponseData;
