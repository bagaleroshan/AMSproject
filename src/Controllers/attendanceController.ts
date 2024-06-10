import { Request, Response } from "express";
import asyncHandler from "express-async-handler";

import {
  createAttendanceService,
  readAllAttendanceService,
  readSpecificAttendanceService,
  deleteAttendanceService,
  updateAttendanceService,
} from "../Services/attendanceServices";
import successResponseData from "../helper/successResponse";
import { myMongooseQuerys } from "../utils/mongooseQuery";
import { AuthenticatedRequest } from "../middleware/isAuthenticated";

export const createAttendanceController = asyncHandler(
  async (req: AuthenticatedRequest, res: Response) => {
    let teacherId = req._id;
    console.log( req._id)
    let result = await createAttendanceService(
      req.params.id,
      teacherId,
      req.body
    );
    successResponseData(res, "Attendance Successfully created.", 201, result);
  }
);

export const readAllAttendanceController = asyncHandler(
  async (req: Request, res: Response) => {
    const { page, limit, sort, select, query, find } = myMongooseQuerys(
      req.query
    );
    let result = await readAllAttendanceService(
      page,
      limit,
      sort,
      select,
      query,
      find
    );
    successResponseData(res, "Successfully Read All Attendances", 200, result);
  }
);

export const readSpecificAttendanceController = asyncHandler(
  async (req: Request, res: Response) => {
    let result = await readSpecificAttendanceService(req.params.id);
    successResponseData(res, "Successfully Read", 200, result);
  }
);
export const updateSpecificAttendanceController = asyncHandler(
  async (req: AuthenticatedRequest, res: Response) => {
    let teacherId = req._id;
    console.log( req._id)
    let result = await updateAttendanceService(
      req.params.id,
      teacherId,
      req.body
    );
    successResponseData(res, "Attendance Successfully created.", 201, result);
  }
);

export const deleteAttendanceController = asyncHandler(
  async (req: Request, res: Response) => {
    let result = await deleteAttendanceService(req.params.id);
    successResponseData(res, "Successfully Deleted", 200, result);
  }
);
