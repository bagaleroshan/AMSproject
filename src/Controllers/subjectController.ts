import { Request, Response } from "express";
import asyncHandler from "express-async-handler";

import {
  createSubjectService,
  readAllSubjectService,
  readSpecificSubjectService,
  updateSubjectService,
} from "../Services/subjectServices";
import { deleteStudentService } from "../Services/studentService";
import successResponseData from "../helper/successResponse";
import { myMongooseQuerys } from "../utils/mongooseQuery";

export const createSubjectController = asyncHandler(
  async (req: Request, res: Response) => {
    let result = await createSubjectService(req.body);
    successResponseData(res, "Successfully Subject created.", 201, result, "");
  }
);

export const readAllSubjectController = asyncHandler(
  async (req: Request, res: Response) => {
    const { page, limit, sort, select, find } = myMongooseQuerys(req.query);
    let result = await readAllSubjectService(page, limit, sort, select, find);

    successResponseData(res, "Successfully Read All Subjects", 200, result, "");
  }
);

export const readSpecificSubjectController = asyncHandler(
  async (req: Request, res: Response) => {
    let result = await readSpecificSubjectService(req.params.id);
    successResponseData(res, "Successfully Read", 200, result, "");
  }
);

export const updateSubjectController = asyncHandler(
  async (req: Request, res: Response) => {
    let result = await updateSubjectService(req.params.id, req.body);
    successResponseData(res, "Successfully Updated", 201, result, "");
  }
);

export const deleteSubjectController = asyncHandler(
  async (req: Request, res: Response) => {
    let result = await deleteStudentService(req.params.id);
    successResponseData(res, "Successfully Deleted", 200, result, "");
  }
);
