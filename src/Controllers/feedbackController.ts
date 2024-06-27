import { Request, Response } from "express";
import asyncHandler from "express-async-handler";

import { Types } from "mongoose";

import successResponseData from "../helper/successResponse";
import { createFeedbackService, deleteFeedbackService, readAllFeedbackService, readSpecificFeedbackService, requestFeedbackService, updateFeedbackService } from "../Services/feedbackServices";
import { myMongooseQuerys } from "../utils/mongooseQuery";
import { Student } from "../Schema/model";
import { readSpecificGroupService } from "../Services/groupServices";

const ObjectId = Types.ObjectId;

export const createFeedbackController = asyncHandler(
  async (req: Request, res: Response) => {
    let token = req.query.token as string
    let result = await createFeedbackService(req.body,token);
    successResponseData(res, "Feedback created Successfully.", 201, result);
  }
);
export const requestFeedbackController = asyncHandler(
  async (req: Request, res: Response) => {
    let resGroup = await readSpecificGroupService(req.params.id);
    let result = await requestFeedbackService(resGroup);
    successResponseData(res, "Feedback created Successfully.", 201, result);
  }
);

export const readAllFeedbackController = asyncHandler(
  async (req: Request, res: Response) => {
    let { page, limit, sort, select, query, find } = myMongooseQuerys(
      req.query
    );

    const groupId = find.group;
    if (groupId) {
      let groupObjectId = new ObjectId(String(groupId));
      let result = await readAllFeedbackService(
        page,
        limit,
        sort,
        select,
        query,
        { ...find, group: groupObjectId }
      );
      successResponseData(res, "Successfully Read All Student.", 200, result);
    }
      let result = await readAllFeedbackService(
        page,
        limit,
        sort,
        select,
        query,
        find
      );
      successResponseData(res, "Successfully Read All Feedback.", 200, result);
    }
);

export const readSpecificFeedbackController = asyncHandler(
  async (req: Request, res: Response) => {
    let result = await readSpecificFeedbackService(req.params.id);
    successResponseData(res, "Read Successfully.", 200, result);
  }
);

export const updateFeedbackController = asyncHandler(
  async (req: Request, res: Response) => {
    let result = await updateFeedbackService(req.params.id, req.body);
    successResponseData(res, "Successfully Updated.", 201, result);
  }
);
export const deleteFeedbackController = asyncHandler(
  async (req: Request, res: Response) => {
    let result = await deleteFeedbackService(req.params.id);
    successResponseData(res, "Successfully Deleted.", 200, result);
  }
);

const getStudentEmail = async(groupId:string)=>{
  let students = await Student.find({
    groups:groupId
  })
}