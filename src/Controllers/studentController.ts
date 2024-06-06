import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import {
  addAttendance,
  createStudentService,
  deleteStudentService,
  readAllStudentService,
  readSpecificStudentService,
  updateStudentService,
} from "../Services/studentService";
import { emailSender } from "../helper/emailSender";
import successResponseData from "../helper/successResponse";
import { myMongooseQuerys } from "../utils/mongooseQuery";


interface Attendance {
  date: string;
  isPresent: boolean;
}
export const createStudentController = asyncHandler(
  async (req: Request, res: Response) => {
    let result = await createStudentService(req.body);
   
    successResponseData(
      res,
      "Successfully created Student.",
      201,
      result
    );
  }
);

export const readAllStudentController = asyncHandler(
  async (req: Request, res: Response) => {
    const { page, limit, sort, select,query, find } = myMongooseQuerys(req.query);
    let result = await readAllStudentService(page, limit, sort, select,query, find);
    successResponseData(res, "Successfully Read All Student", 200, result);
  }
);

export const readSpecificStudentController = asyncHandler(
  async (req: Request, res: Response) => {
    let result = await readSpecificStudentService(req.params.id);
    successResponseData(res, "Read Successfully", 200, result);
  }
);

export const updateStudentController = asyncHandler(
  async (req: Request, res: Response) => {
    let result = await updateStudentService(req.params.id, req.body);
    successResponseData(res, "Successfully Updated", 201, result);
  }
);
export const addStudentAttendenceController = asyncHandler(
  async (req: Request, res: Response) => {
    let result = await addAttendance(req.params.id, req.body);
    successResponseData(res, "Successfully Updated", 201, result);
  }
);
export const deleteStudentController = asyncHandler(
  async (req: Request, res: Response) => {
    let result = await deleteStudentService(req.params.id);
    successResponseData(res, "Successfully Deleted", 200, result);
  }
);

