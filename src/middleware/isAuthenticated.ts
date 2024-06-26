import { NextFunction, Request, Response } from "express";
import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import { secretKey } from "../utils/constant";

export interface AuthenticatedRequest extends Request {
  _id?: string;
}
const isAuthenticated = asyncHandler(
  async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    let tokenString = req.headers.authorization || "";
    if (!tokenString) {
      throw new Error("Please Log in first.");
    }
    let token = tokenString.split(" ")[1];
    let user: any = await jwt.verify(token, secretKey);
    req._id = user._id;
    next();
  }
);

export default isAuthenticated;
