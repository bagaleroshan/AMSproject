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


export const validateQueryParams = (allowedParams: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const queryParams = Object.keys(req.query);
    const invalidParams = queryParams.filter(param => !allowedParams.includes(param));

    if (invalidParams.length > 0) {
      return res.status(400).json({ error: `Invalid query parameters: ${invalidParams.join(', ')}` });
    }
    next();
  };
};

// Define allowed query parameters
