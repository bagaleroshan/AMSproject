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

const existingAttendancesFunction = async (groupId: string) => {
  const startOfDay = new Date();
  startOfDay.setHours(0, 0, 0, 0);

  const endOfDay = new Date(startOfDay);
  endOfDay.setDate(endOfDay.getDate() + 1);
  endOfDay.setHours(0, 0, 0, 0);

  return await Attendance.find({
    date: {
      $gte: startOfDay,
      $lt: endOfDay,
    },
    groupId,
  });
};

export const createAttendanceService = async (
  groupId: string,
  teacherId: string,
  data: IData
) => {
  const group = await Group.findById(groupId).populate("subject");
  if (!group) {
    throw new Error("Group not found.");
  }
  if (group.teacher.toString() !== teacherId) {
    throw new Error(
      "You are not authorized to take attendance for this group."
    );
  }
  const attendanceTaken = await Attendance.find({
    groupId: groupId,
    studentId: group.students[0],
  });
  if (group.subject.numberOfClasses === attendanceTaken.length) {
    await Group.findByIdAndUpdate(groupId, { active: false });
    throw new Error("Maximum number of classes has been reached.");
  }
  const existingAttendances = await existingAttendancesFunction(groupId);

  if (existingAttendances.length > 0) {
    throw new Error(`Attendance has already been taken for the day.`);
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
  const createdAttendance = await Attendance.insertMany(attendanceData);

  if (attendanceTaken.length === 0) {
    await Group.findByIdAndUpdate(groupId, { active: true });
  }
  const totalAttendance = await Attendance.find({
    groupId: groupId,
    studentId: group.students[0],
  });
  if (totalAttendance.length >= group.subject.numberOfClasses) {
    await Group.findByIdAndUpdate(groupId, { active: false });
  }
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
// export const updateAttendanceService =async()=>{
//   return await Attendance.findByIdAndUpdate()
// }

export const readSpecificAttendanceService = async (id: string) => {
  return await Attendance.findById(id);
};

export const deleteAttendanceService = async (id: string) => {
  return await Attendance.findByIdAndDelete(id);
};
