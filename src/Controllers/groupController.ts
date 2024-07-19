import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { Types } from "mongoose";
import {
  addStudentGroupService,
  createGroupService,
  deleteGroupService,
  readAllGroupService,
  readGroupsByTeacherId,
  readSpecificGroupService,
  removeStudentGroupService,
  updateGroupService,
} from "../Services/groupServices";
import { AuthenticatedRequest } from "../middleware/isAuthenticated";
import { myMongooseQuerys } from "../utils/mongooseQuery";
import successResponseData from "../utils/successResponse";

interface FindQuery {
  teacher?: Types.ObjectId;
  [key: string]: any;
}
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
    const activeQueryParam = req.query.active;
    let active;
    if (activeQueryParam === "true") {
      active = true;
    } else if (activeQueryParam === "false") {
      active = false;
    }
    const findQuery: FindQuery = { ...find };
    if (active !== undefined) {
      findQuery.active = active;
    }
    let result = await readAllGroupService(
      page,
      limit,
      sort,
      select,
      query,
      findQuery
    );
    successResponseData(res, "Successfully Read All Groups.", 200, result);
  }
);

export const readRelatedGroupController = asyncHandler(
  async (req: AuthenticatedRequest, res: Response) => {
    const { page, limit, sort, select, query, find } = myMongooseQuerys(
      req.query
    );
    const { ObjectId } = Types;
    const teacherId = req._id;
    const teacherObjectId = new ObjectId(teacherId);
    const activeQueryParam = req.query.active;
    let active;
    if (activeQueryParam === "true") {
      active = true;
    } else if (activeQueryParam === "false") {
      active = false;
    }
    const findQuery: FindQuery = { ...find, teacher: teacherObjectId };
    if (active !== undefined) {
      findQuery.active = active;
    }
    let result = await readGroupsByTeacherId(
      page,
      limit,
      sort,
      select,
      query,
      findQuery
    );
    successResponseData(res, "Read Group Successfully.", 200, result);
  }
);

export const readSpecificGroupController = asyncHandler(
  async (req: Request, res: Response) => {
    let result = await readSpecificGroupService(req.params.id);
    successResponseData(res, "Successfully Read.", 200, result);
  }
);

export const updateGroupController = asyncHandler(
  async (req: Request, res: Response) => {
    let result = await updateGroupService(req.params.id, req.body);
    successResponseData(res, "Successfully Updated.", 201, result);
  }
);

export const deleteGroupController = asyncHandler(
  async (req: Request, res: Response) => {
    let result = await deleteGroupService(req.params.id);
    successResponseData(res, "Successfully Deleted.", 200, result);
  }
);

export const addStudentGroupController = asyncHandler(
  async (req: Request, res: Response) => {
    let result = await addStudentGroupService(req.params.id, req.body.students);
    successResponseData(res, "Successfully Added.", 201, result);
  }
);

export const removeStudentGroupController = asyncHandler(
  async (req: Request, res: Response) => {
    let result = await removeStudentGroupService(
      req.params.id,
      req.body.students
    );
    successResponseData(res, "Successfully Removed.", 200, result);
  }
);
