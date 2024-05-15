import { NextFunction, Request, Response } from "express";

export const validation = (validationSchema: any) => {
  return (req: Request, res: Response, next: NextFunction) => {
    let data = validationSchema.validate(req.body);
    let error = data.error;
    if (error) {
      res.status(400).json({
        success: false,
        message: error.details[0].message,
      });
    } else {
      next();
    }
  };
};
