import { Group } from "../Schema/model";
import { searchAndPaginate } from "../utils/searchAndPaginate";

export const createGroupService = async (data: {}) => {
  return await Group.create(data);
};

export const readAllGroupService = async (
  page: number,
  limit: number,
  sort: string,
  select: string,
  query: string,
  find: {}
) => {
  const groupFields = [
    "teacher",
    "subject",
    "groupName",
    "startTime",
    "endTime",
  ];
  const data = await searchAndPaginate(
    Group,
    page,
    limit,
    sort,
    select,
    query,
    find,
    groupFields
  );
  return data;
};

export let readSpecificGroupService = async (id: string) => {
  return await Group.findById(id);
};

export let updateGroupService = async (id: string, data: {}) => {
  return await Group.findByIdAndUpdate(id, data, { new: true });
};

export let deleteGroupService = async (id: string) => {
  return await Group.findByIdAndDelete(id);
};
export const addStudentGroupService = async (
  id: string,
  students: string[]
) => {
  return await Group.findByIdAndUpdate(
    id,
    { $addToSet: { students: { $each: students } } },
    { new: true }
  )
    .populate("subject")
    .populate("teacher")
    .populate("students");
};
