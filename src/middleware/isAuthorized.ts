import { NextFunction, Response } from "express";
import asyncHandler from "express-async-handler";
import { User } from "../Schema/model";
import { AuthenticatedRequest } from "./isAuthenticated";

const isAuthorized = (roles: string[]) =>
  asyncHandler(
    async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
      let _id = req._id;
      let result = await User.findById(_id);
      let tokenRole = result.role;
      if (roles.includes(tokenRole)) {
        next();
      } else {
        res.status(403).json({
          success: false,
          message: "User not Authorized ",
        });
      }
    }
  );

export default isAuthorized;
