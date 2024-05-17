import { Response } from "express";

const successResponseData = (
  res: Response,
  message: string = "Successfully Completed",
  statusCode: number = 200,
  result: any,
  token: string
) => {
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
