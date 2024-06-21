import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { Types } from "mongoose";
// import {
//   addStudentCarService,
//   createCarService,
//   deleteCarService,
//   readAllCarService,groupRouter
//   readGroupsByTeacherId,
//   readSpecificCarService,
//   updateCarService,
// } from "../Services/groupServices";
import successResponseData from "../helper/successResponse";
import { AuthenticatedRequest } from "../middleware/isAuthenticated";
import { myMongooseQuerys } from "../utils/mongooseQuery";
import { addStudentCarService, createCarService, deleteCarService, readAllCarService, readGroupsByTeacherId, readSpecificCarService, updateCarService } from "../Services/carServices";

interface FindQuery {
  teacher?: Types.ObjectId;
  [key: string]: any;
}
export const createCarController = asyncHandler(
  async (req: Request, res: Response) => {
    let result = await createCarService(req.body);
    successResponseData(res, "Group Successfully created.", 201, result);
  }
);

export const readAllCarController = asyncHandler(
  async (req: Request, res: Response) => {
    const { page, limit, sort, select, query, find } = myMongooseQuerys(
      req.query
    );
    let result = await readAllCarService(
      page,
      limit,
      sort,
      select,
      query,
      find
    );
    successResponseData(res, "Successfully Read All Groups.", 200, result);
  }
);

export const readRelatedCarController = asyncHandler(
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

export const readSpecificCarController = asyncHandler(
  async (req: Request, res: Response) => {
    let result = await readSpecificCarService(req.params.id);
    successResponseData(res, "Successfully Read.", 200, result);
  }
);

export const updateCarController = asyncHandler(
  async (req: Request, res: Response) => {
    let result = await updateCarService(req.params.id, req.body);
    successResponseData(res, "Successfully Updated.", 201, result);
  }
);

export const deleteCarController = asyncHandler(
  async (req: Request, res: Response) => {
    let result = await deleteCarService(req.params.id);
    successResponseData(res, "Successfully Deleted.", 200, result);
  }
);

export const addCarController = asyncHandler(
  async (req: Request, res: Response) => {
    let result = await addStudentCarService(req.params.id, req.body.students);
    successResponseData(res, "Successfully Added.", 201, result);
  }
);
