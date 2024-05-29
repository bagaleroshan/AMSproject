import { NextFunction, Request, Response } from "express";

export let errorHandler = (
  error: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let statusCode = 500;
  let message = "An unexpected error occurred";
  if (error.code === 11000) {
    statusCode = 409;
    const field = Object.keys(error.keyPattern)[0];
    message = `${field} already exists.`;
  }
  console.log(error);

  res.status(statusCode).json({
    success: false,
    message: message,
  });
};
