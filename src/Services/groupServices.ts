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
export const getGroupsByTeacherId = async (teacherId: any) => {
  return await Group.find({ teacher: teacherId });
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
  const group = await Group.findById(id);
  if (!group) {
    throw new Error("Group not found");
  } else {
    let outStudent = [...new Set([...group.students, ...students])];
    return await Group.findByIdAndUpdate(
      id,
      { students: outStudent },
      { new: true }
    );
  }
};
