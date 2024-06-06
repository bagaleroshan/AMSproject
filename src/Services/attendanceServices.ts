import { Attendance, Group } from "../Schema/model";
import { searchAndPaginate } from "../utils/searchAndPaginate";

interface IAttendance {
  studentId: string;
  status: boolean;
}
interface IData {
  date: string;
  attendance: IAttendance[];
}
export const createAttendanceService = async (
  groupId: string,
  teacherId: any,
  data: IData
) => {
  const group = await Group.findById(groupId);
  if (!group) {
    throw new Error("Group not found");
  }
  console.log(group.teacher +''+teacherId)
  if (group.teacher!=teacherId) {
    throw new Error("You are not authorized to take attendance for this group.");
  }

  const startOfDay = new Date();
  startOfDay.setHours(0, 0, 0, 0);

  const endOfDay = new Date(startOfDay);
  endOfDay.setDate(endOfDay.getDate() + 1);
  endOfDay.setHours(0, 0, 0, 0);

  const existingAttendances = await Attendance.find({
    date: {
      $gte: startOfDay,
      $lt: endOfDay,
    },
    groupId,
  });
  if (existingAttendances.length > 0) {
    throw new Error(`Attendance has already been taken today.`);
  }
  const date = data.date;
  const attendanceData = data.attendance.map((student) => {
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

export const readSpecificAttendanceService = async (id: string) => {
  return await Attendance.findById(id);
};

export const deleteAttendanceService = async (id: string) => {
  return await Attendance.findByIdAndDelete(id);
};
