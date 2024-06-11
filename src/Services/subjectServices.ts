import { Group, Subject } from "../Schema/model";
import { searchAndPaginate } from "../utils/searchAndPaginate";
import { subject } from "../utils/sendMail";

export const createSubjectService = async (data: {}) => {
  return await Subject.create(data);
};

export const readAllSubjectService = async (
  page: number,
  limit: number,
  sort: string,
  select: string,
  query: string,
  find: {}
) => {
  const subjectFields = [
    { field: "subjectName", type: "string" },
    { field: "subjectCode", type: "string" },
    { field: "numberOfClasses", type: "number" },
  ];
  const data = await searchAndPaginate(
    Subject,
    page,
    limit,
    sort,
    select,
    query,
    find,
    subjectFields
  );
  console.log(sort);
  return data;
};

export let readSpecificSubjectService = async (id: string) => {
  return await Subject.findById(id);
};

export let updateSubjectService = async (id: string, data: {}) => {
  return await Subject.findByIdAndUpdate(id, data, { new: true });
};

export let deleteSubjectService = async (id: string) => {
  const subjectAssignedToGroup = await Group.findOne({
    subject: id,
  });
  if (subjectAssignedToGroup) {
    throw new Error(
      "Subject cannot be deleted as it is associated with a group."
    );
  }
  return await Subject.findByIdAndDelete(id);
};
