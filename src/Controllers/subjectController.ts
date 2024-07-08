import { Request, Response } from "express";
import asyncHandler from "express-async-handler";

import {
  createSubjectService,
  deleteSubjectService,
  readAllSubjectService,
  readSpecificSubjectService,
  updateSubjectService,
} from "../Services/subjectServices";
import { myMongooseQuerys } from "../utils/mongooseQuery";
import successResponseData from "../utils/successResponse";

export const createSubjectController = asyncHandler(
  async (req: Request, res: Response) => {
    let result = await createSubjectService(req.body);
    successResponseData(res, "Successfully Subject created.", 201, result);
  }
);

export const readAllSubjectController = asyncHandler(
  async (req: Request, res: Response) => {
    const { page, limit, sort, select, query, find } = myMongooseQuerys(
      req.query
    );
    let result = await readAllSubjectService(
      page,
      limit,
      sort,
      select,
      query,
      find
    );
    successResponseData(res, "Successfully Read All Subjects.", 200, result);
  }
);

export const readSpecificSubjectController = asyncHandler(
  async (req: Request, res: Response) => {
    let result = await readSpecificSubjectService(req.params.id);
    successResponseData(res, "Successfully Read.", 200, result);
  }
);

export const updateSubjectController = asyncHandler(
  async (req: Request, res: Response) => {
    let result = await updateSubjectService(req.params.id, req.body);
    successResponseData(res, "Successfully Updated.", 201, result);
  }
);

export const deleteSubjectController = asyncHandler(
  async (req: Request, res: Response) => {
    let result = await deleteSubjectService(req.params.id);
    successResponseData(res, "Successfully Deleted.", 200, result);
  }
);
