import { Request, Response } from "express";
import asyncHandler from "express-async-handler";

import {
  createAttendanceService,
  readAllAttendanceService,
  readSpecificAttendanceService,
  updateSpecificAttendanceService,
} from "../Services/attendanceServices";
import successResponseData from "../helper/successResponse";
import { AuthenticatedRequest } from "../middleware/isAuthenticated";
import { myMongooseQuerys } from "../utils/mongooseQuery";
import { Attendance } from "../Schema/model";
import { IAttendance, IUAttendance } from "../helper/interfaces";

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
    let result = await readSpecificAttendanceService(
      req.params.groupId,
      req.body.date
    );
    successResponseData(res, "Read Successfully.", 200, result);
  }
);
export const updateSpecificStudentController = asyncHandler(
  async (req: Request, res: Response) => {
    let numbers: IUAttendance[] = req.body.Students;
    let result = await numbers.reduce(async (accumulatorPromise, num, index) => {
      // Wait for the accumulator to resolve before proceeding
      let accumulator = await accumulatorPromise;

      // Update the document and push the result to accumulator
      let updatedDoc = await Attendance.findByIdAndUpdate(num.attendenceId, { status: num.status }, { new: true });
      accumulator.push({ success: (updatedDoc)  });
      return accumulator;
    }, Promise.resolve([]) as any);
    successResponseData(res, "Updated Successfully.", 200, result);
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
