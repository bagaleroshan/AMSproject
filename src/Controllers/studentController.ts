import { Request, Response } from "express";
import asyncHandler from "express-async-handler";

import { Types } from "mongoose";
import {
  createStudentService,
  deleteStudentService,
  readAllStudentService,
  readSpecificStudentService,
  updateStudentService,
} from "../Services/studentService";
import successResponseData from "../helper/successResponse";
import { myMongooseQuerys } from "../utils/mongooseQuery";

const ObjectId = Types.ObjectId;
export const createStudentController = asyncHandler(
  async (req: Request, res: Response) => {
    let result = await createStudentService(req.body);
    successResponseData(res, "Student created Successfully.", 201, result);
  }
);

export const readAllStudentController = asyncHandler(
  async (req: Request, res: Response) => {
    let { page, limit, sort, select, query, find } = myMongooseQuerys(
      req.query
    );
    const groupId = find.groups;
    let groupObjectId = new ObjectId(String(groupId));
    let result = await readAllStudentService(page, limit, sort, select, query, {
      ...find,
      groups: groupObjectId,
    });
    successResponseData(res, "Successfully Read All Student.", 200, result);
  }
);

export const readSpecificStudentController = asyncHandler(
  async (req: Request, res: Response) => {
    let result = await readSpecificStudentService(req.params.id);
    successResponseData(res, "Read Successfully.", 200, result);
  }
);

export const updateStudentController = asyncHandler(
  async (req: Request, res: Response) => {
    let result = await updateStudentService(req.params.id, req.body);
    successResponseData(res, "Successfully Updated.", 201, result);
  }
);
export const deleteStudentController = asyncHandler(
  async (req: Request, res: Response) => {
    let result = await deleteStudentService(req.params.id);
    successResponseData(res, "Successfully Deleted.", 200, result);
  }
);
