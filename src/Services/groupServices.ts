import { Types } from "mongoose";
import { Attendance, Group, Student } from "../Schema/model";
import { getAttendanceDatesForGroup } from "../utils/attendenceServiceFunction";
import { ILookup } from "../utils/interfaces";
import { searchAndPaginate } from "../utils/searchAndPaginate";
import { getGroupAttendanceStats } from "../utils/groupServiceFunction";

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
  const result = await searchAndPaginate(
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
  // return data;

  const groupsWithStats = await Promise.all(
    result.results.map(async (group: any) => {
      const stats = await getGroupAttendanceStats(group.id);
      return {
        ...group,
        attendanceStats: stats,
      };
    })
  );

  return {
    ...result,
    results: groupsWithStats,
  };
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
  const result = await searchAndPaginate(
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

  const groupsWithStats = await Promise.all(
    result.results.map(async (group: any) => {
      const stats = await getGroupAttendanceStats(group.id);
      return {
        ...group,
        attendanceStats: stats,
      };
    })
  );

  return {
    ...result,
    results: groupsWithStats,
  };
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
  const group = await Group.findById(id);
  if (!group) {
    throw new Error("Group not found");
  }
  const newStudents = students.filter(
    (studentId) => !group.students.includes(studentId)
  );

  group.students = [...group.students, ...newStudents];
  await group.save();

  for (const studentId of newStudents) {
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

export const removeStudentGroupService = async (
  id: string,
  students: string[]
) => {
  const group = await Group.findById(id);
  if (!group) {
    throw new Error("Group not found");
  }
  for (const studentId of students) {
    const attendanceRecords = await Attendance.find({
      studentId: studentId,
      status: "P",
    });
    if (attendanceRecords.length >= 7) {
      throw new Error(
        `Cannot remove student, who has 7 or more days of attendance.`
      );
    }
  }
  const remainingStudents = group.students.filter(
    (student: any) => !students.includes(student.toString())
  );

  group.students = remainingStudents;

  await group.save();

  await Promise.all(
    students.map((studentId) =>
      Student.findByIdAndUpdate(
        studentId,
        { $pull: { groups: id } },
        { new: true }
      )
    )
  );

  return group;
};
