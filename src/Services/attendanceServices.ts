import { Attendance, User } from "../Schema/model";
import {
  attendanceData,
  getAttendanceByDate,
  groupData,
  isAttendanceTaken,
  isClassCrossedLimit,
  toggleActiveGroup,
} from "../helper/attendenceServiceFunction";
import { IData } from "../helper/interfaces";
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
  return await getAttendanceByDate(groupId, date);
};
export const updateSpecificAttendanceService = async (AttendenceData: [{}]) => {
  console.log("fasfdsfas");
  return await AttendenceData.map((val, i) => {
    return console.log(val);
  });
};
