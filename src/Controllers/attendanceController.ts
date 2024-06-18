import { Request, Response } from "express";
import asyncHandler from "express-async-handler";

import {
  createAttendanceService,
  readAllAttendanceService,
  readSpecificAttendanceService,
} from "../Services/attendanceServices";
import successResponseData from "../helper/successResponse";
import { AuthenticatedRequest } from "../middleware/isAuthenticated";
import { myMongooseQuerys } from "../utils/mongooseQuery";

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
    let result = await readAllAttendanceService(
      page,
      limit,
      sort,
      select,
      query,
      find
    );
    successResponseData(res, "Successfully Read All Attendances.", 200, result);
  }
);

export const readSpecificStudentController = asyncHandler(
  async (req: Request, res: Response) => {
    let result = await readSpecificAttendanceService(req.params.groupId);
    successResponseData(res, "Read Successfully.", 200, result);
  }
);
// export const updateAttendanceController = asyncHandler(
//   async (req: Request, res: Response) => {
//     let result = await updateAttendanceService(req.params.id, req.body);
//     successResponseData(res, "Successfully Updated.", 201, result);
//   }
// );

// export const deleteAttendanceController = asyncHandler(
//   async (req: Request, res: Response) => {
//     let result = await deleteAttendanceService(req.params.id);
//     successResponseData(res, "Successfully Deleted.", 200, result);
//   }
// );
