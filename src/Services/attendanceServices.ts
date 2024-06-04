import { Attendance, Group } from "../Schema/model";
import { searchAndPaginate } from "../utils/searchAndPaginate";
interface IAttendance {
  date: Date;
  studentId: string;
  status: boolean;
}
export const createAttendanceService = async (
  groupId: string,
  data: IAttendance[]
) => {
  const group = await Group.findById(groupId);
  if (!group) {
    throw new Error("Group not found");
  }
  let today = new Date().toLocaleString().split(",")[0];
  const existingAttendances = await Attendance.find({
    date: today,
    groupId,
  });
  if (existingAttendances.length > 0) {
    throw new Error(`Attendance has already been taken today.`);
  }
  const attendanceData = data.map((student) => {
    const date = student.date;
    return {
      date: date,
      groupId,
      studentId: student.studentId,
      status: student.status,
    };
  });
  return await Attendance.insertMany(attendanceData);
};

export const readAllAttendanceService = async (
  page: number,
  limit: number,
  sort: string,
  select: string,
  query: string,
  find: {}
) => {
  const attendanceFields = ["date", "groupId", "attendances"];
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

export const readSpecificAttendanceService = async (id: string) => {
  return await Attendance.findById(id);
};

export const deleteAttendanceService = async (id: string) => {
  return await Attendance.findByIdAndDelete(id);
};
