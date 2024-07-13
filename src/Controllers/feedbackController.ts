import { Request, Response } from "express";
import asyncHandler from "express-async-handler";

import { Types } from "mongoose";

import {
  createFeedbackService,
  deleteFeedbackService,
  getFeedbackByGroupIdService,
  getFeedbackByTeacherIdService,
  readAllFeedbackService,
  readSpecificFeedbackService,
  requestFeedbackService,
  updateFeedbackService,
} from "../Services/feedbackServices";
import { readSpecificGroupService } from "../Services/groupServices";
import { myMongooseQuerys } from "../utils/mongooseQuery";
import successResponseData from "../utils/successResponse";

const ObjectId = Types.ObjectId;

export const createFeedbackController = asyncHandler(
  async (req: Request, res: Response) => {
    let tokenString = req.headers.authorization || "";
    let token = tokenString.split(" ")[1];
    let result = await createFeedbackService(req.body, token);
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

    const groupId = find.groupId;
    const { teacherId } = req.body;

    if (teacherId) {
      let teacherObjectId = new ObjectId(String(teacherId));
      let result = await readAllFeedbackService(
        page,
        limit,
        sort,
        select,
        query,
        { "group.teacher": teacherObjectId, ...find }
      );
      successResponseData(res, "Successfully Read All Student.", 200, result);
    }
    if (groupId) {
      let groupObjectId = new ObjectId(String(groupId));

      let result = await readAllFeedbackService(
        page,
        limit,
        sort,
        select,
        query,
        { "group._id": groupObjectId }
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

export const getFeedbackByTeacherIdController = asyncHandler(
  async (req: Request, res: Response) => {
    let { page, limit, sort, select, query, find } = myMongooseQuerys(
      req.query
    );
    let teacherId = req.params.teacherId;
    let result = await getFeedbackByTeacherIdService(
      teacherId,
      page,
      limit,
      sort,
      select,
      query,
      find
    );

    successResponseData(
      res,
      "Successfully Read Feedback by Teacher ID.",
      200,
      result
    );
  }
);


export const getFeedbackByGroupIdController = asyncHandler(
  async (req: Request, res: Response) => {
    let { page, limit, sort, select, query, find } = myMongooseQuerys(
      req.query
    );
    let groupId = req.params.groupId;
    let result = await getFeedbackByGroupIdService(
      groupId,
      page,
      limit,
      sort,
      select,
      query,
      find
    );

    successResponseData(
      res,
      "Successfully Read Feedback by group ID.",
      200,
      result
    );
  }
);

