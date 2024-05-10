import { Response } from "express";

const successResponseData = (
  res: Response,
  message: string = "Successfully Completed",
  statusCode: number = 200,
  result: any
) => {
  return res.status(statusCode).json({
    success: true,
    message: message,
    result: result,
  });
};
export default successResponseData;
