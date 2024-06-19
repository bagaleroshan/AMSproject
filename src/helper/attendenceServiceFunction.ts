import { Attendance, Group } from "../Schema/model";
import { IData } from "./interfaces";

export const groupData = async (
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
      throw new Error("Attendance cannot be taken on provided date.");
    }
  }
  return group;
};
export const isClassCrossedLimit = async (groupId: string, group: any) => {
  const attendanceTaken = await Attendance.find({
    groupId: groupId,
    studentId: group.students[0],
  });
  if (group.subject.numberOfClasses === attendanceTaken.length) {
    throw new Error("Maximum number of classes has been reached.");
  }
};
export const isAttendanceTaken = async (
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
    date !== startOfToday.toISOString().split("T")[0] &&
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

export const attendanceData = (groupId: string, data: IData) => {
  return data.attendance.map((student) => {
    return {
      date: data.date,
      groupId,
      studentId: student.studentId,
      status: student.status,
    };
  });
};

export const toggleActiveGroup = async (groupId: string, group: any) => {
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

export const getAttendanceByDate = async (groupId: string, date: string) => {
  return await Attendance.find({ groupId: groupId, date: date });
};
export const patchAttendanceByDate = async (attendenceArray: [{}]) => {
  attendenceArray.map((val,i)=>{console.log(val)})
 // return await Attendance.findByIdAndUpdate({ groupId: groupId, date: date });
};
