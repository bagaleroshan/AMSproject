import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import {
  createStudentService,
  deleteStudentService,
  readAllStudentService,
  readSpecificStudentService,
  updateStudentService,
} from "../Services/studentService";
import { emailSender } from "../helper/emailSender";
import successResponseData from "../helper/successResponse";
import { myMongooseQuerys } from "../utils/mongooseQuery";

export const createStudentController = asyncHandler(
  async (req: Request, res: Response) => {
    let result = await createStudentService(req.body);
    await emailSender(req.body.email);
    successResponseData(
      res,
      "Successfully created Student and Verification email has been sent.",
      201,
      result
    );
  }
);

export const readAllStudentController = asyncHandler(
  async (req: Request, res: Response) => {
    const { page, limit, sort, select, find } = myMongooseQuerys(req.query);
    let result = await readAllStudentService(page, limit, sort, select, find);
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
export const deleteStudentController = asyncHandler(
  async (req: Request, res: Response) => {
    let result = await deleteStudentService(req.params.id);
    successResponseData(res, "Successfully Deleted", 200, result);
  }
);
