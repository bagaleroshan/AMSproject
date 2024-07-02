import { Types } from "mongoose";
import { Attendance, Group, Student } from "../Schema/model";
import { getAttendanceDatesForGroup } from "../utils/attendenceServiceFunction";
import { ILookup } from "../utils/interfaces";
import { searchAndPaginate } from "../utils/searchAndPaginate";

const { ObjectId } = Types;

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
  const lookups: ILookup[] = [
    {
      from: "users",
      localField: "teacher",
      foreignField: "id",
      as: "teacher",
    },
    {
      from: "subjects",
      localField: "subject",
      foreignField: "id",
      as: "subject",
    },
  ];
  const data = await searchAndPaginate(
    Group,
    page,
    limit,
    sort,
    select,
    query,
    find,
    groupFields,
    lookups
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
  const lookups: ILookup[] = [
    {
      from: "subjects",
      localField: "subject",
      foreignField: "id",
      as: "subject",
    },
  ];
  const data = await searchAndPaginate(
    Group,
    page,
    limit,
    sort,
    select,
    query,
    find,
    groupFields,
    lookups
  );
  return data;
};

export let readSpecificGroupService = async (id: string) => {
  return await Group.findById(id)
    .populate({
      path: "subject",
      model: "Subject",
    })
    .populate({
      path: "teacher",
      model: "User",
    })
    .populate({
      path: "students",
      model: "Student",
    });
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

  const regex = /^2023/;
    
    // Specify the groupid to match
    const groupid = 'exampleGroup';

    // Find documents matching both conditions
    const documents = await Attendance.find({ 
      date: { $regex: regex },
      groupid: groupid
    });
    return documents
  const group = await Group.findById(id);
  if (!group) {
    throw new Error("Group not found");
  }
  const newStudents = students.filter(
    (studentId) => !group.students.includes(studentId)
  );
  group.students = [...new Set([...group.students, ...students])];
  await group.save();

  for (const studentId of students) {
    await Student.findByIdAndUpdate(
      studentId,
      { $addToSet: { groups: id } },
      { new: true }
    );
  }

  if (newStudents.length > 0) {
    const attendanceDates = await getAttendanceDatesForGroup(id);
    const attendanceRecords = attendanceDates
      .map((date: any) => {
        return newStudents.map((studentId) => ({
          groupId: new ObjectId(id),
          studentId: new ObjectId(studentId),
          date: new Date(date),
          status: "-",
        }));
      })
      .flat();

    await Attendance.insertMany(attendanceRecords);
  }
  return group;
};
