import jwt from "jsonwebtoken";
import { Feedback } from "../Schema/model";
import { emailSender1 } from "../helper/emailSender";
// import { ILookup } from "../helper/interfaces";
import { secretKey } from "../utils/constant";
import { searchAndPaginate } from "../utils/searchAndPaginate";
import { Types } from "mongoose";
import { ILookup } from "../utils/interfaces";

let createFeedbackService = async (
  data: { student: string; group: string },
  token: string
) => {
  let user: any = await jwt.verify(token, secretKey);
  data.student = user.studentId;
  data.group = user.groupId;
  let existingFeedback = await Feedback.findOne({
    student: data.student,
    group: data.group,
  });
  if (existingFeedback) {
    throw new Error("You have already given Feedback for this group.");
  }
  return await Feedback.create(data);
};
const requestFeedbackService = async (data: any[any]) => {
  data.students.map((val: any, i: any) => {
    emailSender1(val, data.id);
  });
};

let readAllFeedbackService = async (
  page: number,
  limit: number,
  sort: string,
  select: string,
  query: string,
  find: {}
) => {
  const feedbackFields = [
    { field: "onTime", type: "number" },
    { field: "hasDeliveredPower", type: "number" },
    { field: "hasSkills", type: "number" },
    { field: "hasInteraction", type: "number" },
    { field: "isClassFruitful", type: "number" },
    { field: "isClassRoomComfort", type: "number" },
    { field: "hasClearConversation", type: "number" },
    { field: "doesInternetWork", type: "number" },
    { field: "feelChangeOnYourself", type: "number" },
    { field: "student", type: "string" },
    { field: "group", type: "string" },
    { field: "description", type: "string" },
  ];
  const lookups: ILookup[] = [
    {
      from: "students",
      localField: "student",
      foreignField: "id",
      as: "student",
    },
    {
      from: "groups",
      localField: "group",
      foreignField: "id",
      as: "group",
    },
    {
      from: "teachers",
      localField: "teacher",
      foreignField: "id",
      as: "teacher",
    },
  ];

  const data = await searchAndPaginate(
    Feedback,
    page,
    limit,
    sort,
    select,
    query,
    find,
    feedbackFields,
    lookups
  );
  return data;
};
let readSpecificFeedbackService = async (id: string) => {
  return await Feedback.findById(id);
};

let updateFeedbackService = async (id: string, data: {}) => {
  return await Feedback.findByIdAndUpdate(id, data, { new: true });
};

let deleteFeedbackService = async (id: string) => {
  return await Feedback.findByIdAndDelete(id);
};

export {
  createFeedbackService,
  deleteFeedbackService,
  readAllFeedbackService,
  readSpecificFeedbackService,
  requestFeedbackService,
  updateFeedbackService,
};

export const getFeedbackByTeacherIdService = async (
  teacherId: string,
  page: number,
  limit: number,
  sort: string,
  select: string,
  query: string,
  find: {}
) => {
  const feedbackFields = [
    { field: "onTime", type: "number" },
    { field: "hasDeliveredPower", type: "number" },
    { field: "hasSkills", type: "number" },
    { field: "hasInteraction", type: "number" },
    { field: "isClassFretful", type: "number" },
    { field: "isClassRoomComfort", type: "number" },
    { field: "hasClearConversation", type: "number" },
    { field: "doesInternetWork", type: "number" },
    { field: "feelChangeOnYourself", type: "number" },
    { field: "student", type: "string" },
    { field: "group", type: "string" },
    { field: "description", type: "string" },
  ];

  const lookups: ILookup[] = [
    {
      from: "students",
      localField: "student",
      foreignField: "_id",
      as: "student",
    },
    {
      from: "groups",
      localField: "group",
      foreignField: "_id",
      as: "group",
    },
  ];

  find = { ...find, "group.teacherId": new Types.ObjectId(teacherId) };

  const data = await searchAndPaginate(
    Feedback,
    page,
    limit,
    sort,
    select,
    query,
    find,
    feedbackFields,
    lookups
  );

  return data;
};

export const getFeedbackByGroupIdService = async (
  groupId: string,
  page: number,
  limit: number,
  sort: string,
  select: string,
  query: string,
  find: {}
) => {
  const feedbackFields = [
    { field: "onTime", type: "number" },
    { field: "hasDeliveredPower", type: "number" },
    { field: "hasSkills", type: "number" },
    { field: "hasInteraction", type: "number" },
    { field: "isClassFretful", type: "number" },
    { field: "isClassRoomComfort", type: "number" },
    { field: "hasClearConversation", type: "number" },
    { field: "doesInternetWork", type: "number" },
    { field: "feelChangeOnYourself", type: "number" },
    { field: "student", type: "string" },
    { field: "group", type: "string" },
    { field: "description", type: "string" },
  ];

  const lookups: ILookup[] = [
    {
      from: "students",
      localField: "student",
      foreignField: "_id",
      as: "student",
    },
    {
      from: "groups",
      localField: "group",
      foreignField: "_id",
      as: "group",
    },
    {
      from: "teachers",
      localField: "teacher",
      foreignField: "_id",
      as: "teacher",
    },
  ];

  find = { ...find, "group.id": new Types.ObjectId(groupId) };

  const data = await searchAndPaginate(
    Feedback,
    page,
    limit,
    sort,
    select,
    query,
    find,
    feedbackFields,
    lookups
  );

  return data;
};
