import { NextFunction, Request, Response } from "express";
import asyncHandler from "express-async-handler";
import throwError from "../helper/throwError";

const validateQueryParams = (routeQuery: string[]) =>
  asyncHandler((req: Request, res: Response, next: NextFunction) => {
    const invalidParams = Object.keys(req.query).filter(
      (param) =>
        !["page", "limit", "sort", "select", ...routeQuery].includes(param)
    );

    if (invalidParams.length > 0) {
      throwError(`Invalid query parameters: ${invalidParams.join(", ")}`, 422);
      return;
    }

    next();
  });

export default validateQueryParams;
