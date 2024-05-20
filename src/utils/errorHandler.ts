import { NextFunction, Request, Response } from "express";

export let errorHandler = (
  error: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let statusCode = 500;
  if (error.code === 11000) {
    statusCode = 409;
  }

  res.status(statusCode).json({
    success: false,
    message: error.message,
  });
};
