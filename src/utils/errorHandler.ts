import { NextFunction, Request, Response } from "express";

export let errorHandler = (
  error: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let statusCode = error.statusCode || 400;
  let message = error.message || "Something went wrong.";
  if (error.code === 11000) {
    statusCode = 409;
    message = "Duplicate key error";
  }

  res.status(statusCode).json({
    success: false,
    message: message,
  });
};
