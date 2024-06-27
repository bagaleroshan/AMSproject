import { Feedback, Student } from "../Schema/model";
import { emailSender, emailSender1 } from "../helper/emailSender";
import { ILookup } from "../helper/interfaces";
import { searchAndPaginate } from "../utils/searchAndPaginate";
import { sendEmail } from "../utils/sendMail";
import { readSpecificGroupService } from "./groupServices";

let createFeedbackService = async (data: {}) => {
  return await Feedback.create(data);
};
const requestFeedbackService = async (data: any[any]) => {
  data.students.map((val:any,i:any)=>{  emailSender1(val,data.id)})
  // Example of directly sending an email to a specific email address
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
    { field: "isClassFretful", type: "number" },
    { field: "isClassRoomComfort", type: "number" },
    { field: "hasClearConversation", type: "number" },
    { field: "doesInternetWork", type: "number" },
    { field: "feelChangeOnYourself", type: "number" },
    { field: "student", type: "string" },
    { field: "group", type: "string" },
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
  return await Feedback.findByIdAndDelete(id)
 

  
};

export {
  createFeedbackService, deleteFeedbackService, readAllFeedbackService, readSpecificFeedbackService, updateFeedbackService,requestFeedbackService
};

