import { Response } from "express";

const successResponseData = (
  res: Response,
  message: string = "Successfully Completed",
  statusCode: number = 200,
  result: any,
  token?: string
) => {
  const hideFields = (data: any) => {
    const { password, createdAt, updatedAt, ...rest } = data;
    return rest;
  };
  const filteredResult = result._doc
    ? hideFields(result._doc)
    : hideFields(result);
  if (token) {
    return res.status(statusCode).json({
      success: true,
      message: message,
      result: filteredResult,
      token: token,
    });
  }
  return res.status(statusCode).json({
    success: true,
    message: message,
    result: filteredResult,
  });
};
export default successResponseData;
