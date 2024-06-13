import { Group } from "../Schema/model";
import { IgroupData } from "../helper/interfaces";
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
    { field: "teacher", type: "string" },
    { field: "subject", type: "string" },
    { field: "groupName", type: "string" },
    { field: "startTime", type: "string" },
    { field: "endTime", type: "string" },
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

export const readGroupsByTeacherId = async (
  page: number,
  limit: number,
  sort: string,
  select: string,
  query: string,
  find: {}
) => {
  const groupFields = [
    { field: "teacher", type: "string" },
    { field: "subject", type: "string" },
    { field: "groupName", type: "string" },
    { field: "startTime", type: "string" },
    { field: "endTime", type: "string" },
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
export let changeTeacherInGroupService = async (
  id: string,
  data: IgroupData
) => {
  const { teacher } = data;
  return await Group.findByIdAndUpdate(id, teacher, { new: true });
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
