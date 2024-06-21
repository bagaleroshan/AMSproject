import { Attendance, User } from "../Schema/model";
import {
  attendanceData,
  groupData,
  isAttendanceTaken,
  isClassCrossedLimit,
  toggleActiveGroup,
} from "../helper/attendenceServiceFunction";
import { IData, IGroup, IUAttendance } from "../helper/interfaces";
import { searchAndPaginate } from "../utils/searchAndPaginate";

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
  const data = await searchAndPaginate(
    Attendance,
    page,
    limit,
    sort,
    select,
    query,
    find,
    attendanceFields
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
  });
};

export const updateSpecificAttendanceService = async (data: IUAttendance[]) => {
  const updatePromises = data.map(async (attendance) => {
    return await Attendance.findByIdAndUpdate(
      attendance.attendenceId,
      { present: attendance.present },
      { new: true }
    );
  });
  return await Promise.all(updatePromises);
};
