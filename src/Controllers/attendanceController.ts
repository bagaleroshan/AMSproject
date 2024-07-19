import { Request, Response } from "express";
import asyncHandler from "express-async-handler";

import { Types } from "mongoose";
import {
  createAttendanceService,
  getGroupAttendanceAndDaysLeftService,
  getMonthlyAttendanceReportService,
  getTodayAttendanceGroupsCount,
  readAllAttendanceService,
  readSpecificAttendanceService,
  updateSpecificAttendanceService,
} from "../Services/attendanceServices";
import { AuthenticatedRequest } from "../middleware/isAuthenticated";
import { myMongooseQuerys } from "../utils/mongooseQuery";
import successResponseData from "../utils/successResponse";

const ObjectId = Types.ObjectId;
export const createAttendanceController = asyncHandler(
  async (req: AuthenticatedRequest, res: Response) => {
    const teacherId = req._id;
    let result = await createAttendanceService(
      req.params.groupId,
      teacherId as string,
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
    const groupId = find.groupId;
    if (groupId) {
      let groupObjectId = new ObjectId(String(groupId));
      let result = await readAllAttendanceService(
        page,
        limit,
        sort,
        select,
        query,
        {
          "groupId._id": groupObjectId,
        }
      );
      successResponseData(
        res,
        "Successfully Read All Attendances.",
        200,
        result
      );
    } else {
      let result = await readAllAttendanceService(
        page,
        limit,
        sort,
        select,
        query,
        find
      );
      successResponseData(
        res,
        "Successfully Read All Attendances.",
        200,
        result
      );
    }
  }
);

export const readSpecificAttendanceController = asyncHandler(
  async (req: Request, res: Response) => {
    let result = await readSpecificAttendanceService(
      req.params.groupId,
      req.body.date
    );
    successResponseData(res, "Read Successfully.", 200, result);
  }
);
export const updateSpecificAttendanceController = asyncHandler(
  async (req: Request, res: Response) => {
    let result = await updateSpecificAttendanceService(req.body.students);
    successResponseData(res, "Updated Successfully.", 201, result);
  }
);

export const getMonthlyAttendanceReportController = asyncHandler(
  async (req: Request, res: Response) => {
    const { groupId, month } = req.query;
    const result = await getMonthlyAttendanceReportService(
      groupId as string,
      month as string
    );
    successResponseData(
      res,
      "Attendance Report Generated Successfully.",
      200,
      result
    );
  }
);
export const getTodayAttendanceGroupsCountController = asyncHandler(
  async (req: Request, res: Response) => {
    const result = await getTodayAttendanceGroupsCount();
    successResponseData(
      res,
      "Successfully fetched today's attendance groups count.",
      200,
      { count: result }
    );
  }
);

export const getGroupAttendanceAndDaysLeftController = asyncHandler(
  async (req: Request, res: Response) => {
    const { groupId } = req.params;
    const result = await getGroupAttendanceAndDaysLeftService(groupId);
    successResponseData(
      res,
      "Successfully fetched attendance data and days left.",
      200,
      result
    );
  }
);
