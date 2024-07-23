import { endOfToday, startOfToday } from "date-fns";
import { Types } from "mongoose";
import { Attendance, Group, User } from "../Schema/model";
import {
  attendanceData,
  groupData,
  isAttendanceTaken,
  isClassCrossedLimit,
  toggleActiveGroup,
} from "../utils/attendenceServiceFunction";
import { IData, ILookup, IUAttendance } from "../utils/interfaces";
import { searchAndPaginate } from "../utils/searchAndPaginate";

const ObjectId = Types.ObjectId;
export const createAttendanceService = async (
  groupId: string,
  userId: string,
  data: IData
) => {
  const user = await User.findById(userId);
  const role = user.role;
  let group = await groupData(groupId, userId, role, data.date);
  await isClassCrossedLimit(groupId, group);
  await isAttendanceTaken(groupId, data.date, role);
  let _data = attendanceData(groupId, data);
  const createdAttendance = await Attendance.insertMany(_data);
  toggleActiveGroup(groupId, group);
  return createdAttendance;
};

export const readAllAttendanceService = async (
  page: number,
  limit: number,
  sort: string,
  select: string,
  query: string,
  find: {}
) => {
  const attendanceFields = [
    { field: "date", type: "string" },
    { field: "groupId", type: "string" },
    { field: "studentId", type: "string" },
  ];
  const lookups: ILookup[] = [
    {
      from: "groups",
      localField: "groupId",
      foreignField: "id",
      as: "groupId",
    },
    {
      from: "students",
      localField: "studentId",
      foreignField: "id",
      as: "studentId",
    },
  ];
  const data = await searchAndPaginate(
    Attendance,
    page,
    limit,
    sort,
    select,
    query,
    find,
    attendanceFields,
    lookups
  );
  return data;
};

export const readSpecificAttendanceService = async (
  groupId: string,
  date: string
) => {
  const providedDate = new Date(date);
  const startOfProvidedDate = new Date(providedDate);
  startOfProvidedDate.setHours(0, 0, 0, 0);

  const endOfProvidedDate = new Date(startOfProvidedDate);
  endOfProvidedDate.setDate(startOfProvidedDate.getDate() + 1);
  return await Attendance.find({
    date: {
      $gte: startOfProvidedDate,
      $lt: endOfProvidedDate,
    },
    groupId: groupId,
  })
    .populate({
      path: "groupId",
      model: "Group",
    })
    .populate({
      path: "studentId",
      model: "Student",
    });
};

export const updateSpecificAttendanceService = async (data: IUAttendance[]) => {
  const updatePromises = data.map(async (attendance) => {
    return await Attendance.findByIdAndUpdate(
      attendance.attendanceId,
      { status: attendance.status },
      { new: true }
    );
  });
  return await Promise.all(updatePromises);
};

export const getMonthlyAttendanceReportService = async (
  groupId: string | undefined,
  month: string
) => {
  const [year, monthIndex] = month.split("-").map(Number);
  const startOfMonth = new Date(year, monthIndex - 1, 1);
  const endOfMonth = new Date(year, monthIndex, 1);

  const matchStage: any = {
    date: {
      $gte: startOfMonth,
      $lt: endOfMonth,
    },
  };

  if (groupId) {
    matchStage.groupId = new ObjectId(groupId);
  }

  const report = await Attendance.aggregate([
    {
      $match: matchStage,
    },
    {
      $project: {
        day: { $dayOfMonth: "$date" },
        status: 1,
      },
    },
    {
      $group: {
        _id: "$day",
        presentees: { $sum: { $cond: [{ $eq: ["$status", "P"] }, 1, 0] } },
      },
    },
    {
      $sort: { _id: 1 },
    },
  ]);

  return report.map((entry: any) => ({
    day: entry._id,
    presentees: entry.presentees,
  }));
};

export const getTodayAttendanceGroupsCount = async () => {
  const todayStart = startOfToday();
  const todayEnd = endOfToday();

  const todayAttendanceGroups = await Attendance.aggregate([
    {
      $match: {
        date: {
          $gte: todayStart,
          $lte: todayEnd,
        },
      },
    },
    {
      $group: {
        _id: "$groupId",
      },
    },
    {
      $count: "groupCount",
    },
  ]);

  return todayAttendanceGroups.length > 0
    ? todayAttendanceGroups[0].groupCount
    : 0;
};

export const getGroupAttendanceAndDaysLeftService = async (groupId: string) => {
  const group = await Group.findById(groupId).populate("subject");

  if (!group) {
    throw new Error("Group not found");
  }

  const attendanceData = await Attendance.aggregate([
    {
      $match: { groupId: new ObjectId(groupId) },
    },
    {
      $lookup: {
        from: "students",
        localField: "studentId",
        foreignField: "_id",
        as: "studentInfo",
      },
    },
    {
      $unwind: {
        path: "$studentInfo",
        preserveNullAndEmptyArrays: true,
      },
    },
    {
      $group: {
        _id: "$studentId",
        studentName: { $first: "$studentInfo.fullName" },
        attendance: {
          $push: {
            date: "$date",
            status: "$status",
          },
        },
      },
    },
  ]);

  const attendanceTaken = await Attendance.find({
    groupId: groupId,
    studentId: group.students[0],
  });

  const daysLeft = group.subject.numberOfClasses - attendanceTaken.length;

  return {
    data: attendanceData,
    daysLeft: daysLeft,
  };
};

export const createOrUpdateAttendanceService = async (
  groupId: string,
  userId: string,
  data: IData
) => {
  const user = await User.findById(userId);
  const role = user.role;

  const today = new Date().toISOString().split("T")[0];
  const dateOnly = new Date(data.date).toISOString().split("T")[0];

  if (role === "teacher" && dateOnly !== today) {
    throw new Error("Teachers can only take attendance for today.");
  }

  let group = await groupData(groupId, userId, role, data.date);
  await isClassCrossedLimit(groupId, group);

  const existingAttendances = await Attendance.find({
    groupId: groupId,
    studentId: { $in: data.attendance.map((a) => a.studentId) },
    date: {
      $gte: new Date(data.date).setUTCHours(0, 0, 0, 0),
      $lt: new Date(data.date).setUTCHours(24, 0, 0, 0),
    },
  });

  const existingStudentIds = existingAttendances.map((att: any) =>
    att.studentId.toString()
  );

  const newAttendances = data.attendance.filter(
    (att) => !existingStudentIds.includes(att.studentId)
  );
  const updateAttendances = data.attendance.filter((att) =>
    existingStudentIds.includes(att.studentId)
  );

  if (role === "teacher" && updateAttendances.length > 0) {
    throw new Error("Teachers are not allowed to update existing attendances.");
  }

  if (newAttendances.length > 0) {
    let _data = attendanceData(groupId, {
      ...data,
      attendance: newAttendances,
    });
    await Attendance.insertMany(_data);
  }

  const updatePromises = updateAttendances.map(async (attendance) => {
    return await Attendance.findOneAndUpdate(
      {
        groupId: groupId,
        studentId: attendance.studentId,
        date: {
          $gte: new Date(data.date).setUTCHours(0, 0, 0, 0),
          $lt: new Date(data.date).setUTCHours(24, 0, 0, 0),
        },
      },
      { status: attendance.status },
      { new: true }
    );
  });
  await Promise.all(updatePromises);

  toggleActiveGroup(groupId, group);
  return { newAttendances, updateAttendances };
};

/* 
groupId : url ma
body:{
date:"",
attendances:{
studentId:"",
status:""
}
}
*/
