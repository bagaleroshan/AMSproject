import { group } from "console";
import { Attendance, Group, User } from "../Schema/model";
import { searchAndPaginate } from "../utils/searchAndPaginate";

interface IAttendance {
  studentId: string;
  status: boolean;
}
interface IData {
  date: string;
  attendance: IAttendance[];
}
const groupData = async (
  groupId: string,
  teacherId: string,
  role: string,
  date: string
) => {
  const group = await Group.findById(groupId).populate("subject");
  if (!group) {
    throw new Error("Group not found.");
  }

  const today = new Date().toISOString().split("T")[0];
  const dateOnly = new Date(date).toISOString().split("T")[0];

  const firstAttendance = await Attendance.find({ groupId }).sort("date");

  const startDate = firstAttendance[0]
    ? new Date(firstAttendance[0].date).toISOString().split("T")[0]
    : null;

  if (role === "teacher") {
    if (group.teacher.toString() !== teacherId) {
      throw new Error(
        "You are not authorized to take attendance for this group."
      );
    }
    if (dateOnly !== today) {
      throw new Error("Teachers can only take attendance for today.");
    }
  } else if (role === "admin") {
    if (!startDate && dateOnly !== today) {
      throw new Error("First attendance must be taken.");
    }
    if (startDate && (dateOnly < startDate || dateOnly > today)) {
      throw new Error("Invalid Date.");
    }
  }
  return group;
};
const isClassCrossedLimit = async (groupId: string, group: any) => {
  const attendanceTaken = await Attendance.find({
    groupId: groupId,
    studentId: group.students[0],
  });
  if (group.subject.numberOfClasses === attendanceTaken.length) {
    throw new Error("Maximum number of classes has been reached.");
  }
};
const isAttendanceTaken = async (
  groupId: string,
  date: string,
  role: string
) => {
  const providedDate = new Date(date);
  const startOfProvidedDate = new Date(providedDate);
  startOfProvidedDate.setHours(0, 0, 0, 0);

  const endOfProvidedDate = new Date(startOfProvidedDate);
  endOfProvidedDate.setDate(startOfProvidedDate.getDate() + 1);

  const today = new Date();
  const startOfToday = new Date(today);
  startOfToday.setHours(0, 0, 0, 0);

  const endOfToday = new Date(startOfToday);
  endOfToday.setDate(startOfToday.getDate() + 1);
  const existingAttendances = await Attendance.find({
    date: {
      $gte: startOfProvidedDate,
      $lt: endOfProvidedDate,
    },
    groupId: groupId,
  });

  if (
    role === "teacher" &&
    date === startOfToday.toISOString().split("T")[0] &&
    existingAttendances.length > 0
  ) {
    throw new Error(`Attendance has already been taken for today.`);
  }

  if (
    role === "admin" &&
    date !== startOfToday.toISOString().split("T")[0] &&
    existingAttendances.length > 0
  ) {
    throw new Error(`Attendance has already been taken for the provided date.`);
  }
};

const attendanceData = (groupId: string, data: IData) => {
  return data.attendance.map((student) => {
    return {
      date: data.date,
      groupId,
      studentId: student.studentId,
      status: student.status,
    };
  });
};

const toggleActiveGroup = async (groupId: string, group: any) => {
  const totalAttendance = await Attendance.find({
    groupId: groupId,
    studentId: group.students[0],
  });
  if (totalAttendance.length === 1) {
    await Group.findByIdAndUpdate(groupId, { active: true });
  }
  if (totalAttendance.length >= group.subject.numberOfClasses) {
    await Group.findByIdAndUpdate(groupId, { active: false });
  }
};
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
export const readSpecificAttendanceService = async (id: string) => {
  return await Attendance.findById(id);
};

export const deleteAttendanceService = async (id: string) => {
  return await Attendance.findByIdAndDelete(id);
};
