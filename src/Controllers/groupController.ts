import { Request, Response } from "express";
import asyncHandler from "express-async-handler";

import {
  addStudentGroupService,
  createGroupService,
  readAllGroupService,
  readSpecificGroupService,
  updateGroupService,
} from "../Services/groupServices";
import { deleteStudentService } from "../Services/studentService";
import successResponseData from "../helper/successResponse";
import { myMongooseQuerys } from "../utils/mongooseQuery";

export const createGroupController = asyncHandler(
  async (req: Request, res: Response) => {
    let result = await createGroupService(req.body);
    successResponseData(res, "Group Successfully created.", 201, result);
  }
);

export const readAllGroupController = asyncHandler(
  async (req: Request, res: Response) => {
    const { page, limit, sort, select, query, find } = myMongooseQuerys(
      req.query
    );
    let result = await readAllGroupService(
      page,
      limit,
      sort,
      select,
      query,
      find
    );
    successResponseData(res, "Successfully Read All Groups", 200, result);
  }
);

export const readSpecificGroupController = asyncHandler(
  async (req: Request, res: Response) => {
    let result = await readSpecificGroupService(req.params.id);
    successResponseData(res, "Successfully Read", 200, result);
  }
);

export const updateGroupController = asyncHandler(
  async (req: Request, res: Response) => {
    let result = await updateGroupService(req.params.id, req.body);
    successResponseData(res, "Successfully Updated", 201, result);
  }
);

export const deleteGroupController = asyncHandler(
  async (req: Request, res: Response) => {
    let result = await deleteStudentService(req.params.id);
    successResponseData(res, "Successfully Deleted", 200, result);
  }
);

export const addStudentGroupController = asyncHandler(
  async (req: Request, res: Response) => {
    let result = await addStudentGroupService(req.params.id, req.body.students);
    successResponseData(res, "Successfully Added", 201, result);
  }
);
