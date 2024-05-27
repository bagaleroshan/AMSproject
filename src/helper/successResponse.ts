import { Response } from "express";
import { renameIdField } from "../utils/PrimaryKeyFix";

const successResponseData = (
  res: Response,
  message: string = "Successfully Completed",
  statusCode: number = 200,
  result: any,
  token?: string
) => {

  console.log(result)
  //result._doc.id=result._doc._id
  

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
