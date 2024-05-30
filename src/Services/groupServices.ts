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
// export let updateGroupService = async (id: string, data: {}) => {
//   // Retrieve the existing group document
//   const group = await Group.findById(id);
//   if (!group) {
//     throw new Error("Group not found");
//   }

//   // Merge existing students with new students, ensuring no duplicates
//   if (data.students) {
//     group.students = [...new Set([...group.students, ...data.students])];
//   }

//   // Update other fields if necessary
//   if (data.groupName) group.groupName = data.groupName;
//   if (data.subject) group.subject = data.subject;
//   if (data.teacher) group.teacher = data.teacher;
//   if (data.startTime) group.startTime = data.startTime;
//   if (data.endTime) group.endTime = data.endTime;

//   await group.save();
//   return group;
// };

export let deleteGroupService = async (id: string) => {
  return await Group.findByIdAndDelete(id);
};
export let addStudentGroupService = async (id: string, students: string) => {
  return await Group.findByIdAndUpdate(
    id,
    { $push: { students } },
    { new: true }
  );
};
