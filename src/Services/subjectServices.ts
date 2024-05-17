import { Subject } from "../Schema/model";
import { subject } from "../utils/sendMail";

export const createSubjectService = async (data: {}) => {
  return await Subject.create(data);
};

export const readAllSubjectService = async () => {
  return await Subject.find();
};

export let readSpecificSubjectService = async (id: string) => {
  return await Subject.findById(id);
};

export let updateSubjectService = async (id: string, data: {}) => {
  return await Subject.findByIdAndUpdate(id, data, { new: true });
};

export let deleteSubjectService = async (id: string) => {
  return await Subject.findByIdAndDelete(id);
};

export const findSubjectService = async (query: string) => {
  const combinedField = await Subject.aggregate([
    {
      $project: {
        combinedData: {
          $concat: [
            "$subjectName",
            " ",
            "$subjectCode",
            " ",
            { $toString: "$numberOfClasses" },
          ],
        },
        subjectName: 1,
        subjectCode: 1,
        numberOfClasses: 1,
      },
    },
    {
      $match: { combinedData: { $regex: query } },
    },
    {
      $project: {
        combinedData: 0,
      },
    },
  ]);
  const result = combinedField;

  return result;
};
