import { Types } from "mongoose";
import { Attendance, Group } from "../Schema/model";
import { IData } from "./interfaces";

const ObjectId = Types.ObjectId;
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
  const startDate =
    firstAttendance.length > 0
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
  } else if (role === "admin" || role === "superAdmin") {
    if (!startDate && dateOnly !== today) {
      throw new Error("First attendance must be taken.");
    }
    if (startDate && (dateOnly < startDate || dateOnly > today)) {
      throw new Error("Attendance cannot be taken on the provided date.");
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
  startOfProvidedDate.setUTCHours(0, 0, 0, 0);

  const endOfProvidedDate = new Date(providedDate);
  endOfProvidedDate.setUTCDate(providedDate.getUTCDate() + 1);
  endOfProvidedDate.setUTCHours(0, 0, 0, 0);

  const today = new Date();
  const startOfToday = new Date(today);
  startOfToday.setUTCHours(0, 0, 0, 0);

  const endOfToday = new Date(today);
  endOfToday.setUTCDate(today.getUTCDate() + 1);
  endOfToday.setUTCHours(0, 0, 0, 0);

  const existingAttendances = await Attendance.find({
    date: {
      $gte: startOfProvidedDate,
      $lt: endOfProvidedDate,
    },
    groupId: groupId,
  });

  const formattedStartOfToday = startOfToday.toISOString().split("T")[0];
  const formattedProvidedDate = providedDate.toISOString().split("T")[0];
  if (role === "teacher" && formattedProvidedDate !== formattedStartOfToday) {
    throw new Error(`Teachers can only take attendance for today.`);
  }

  if (existingAttendances.length > 0) {
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

export const getAttendanceDatesForGroup = async (groupId: string) => {
  const attendanceDates = await Attendance.aggregate([
    {
      $match: {
        groupId: new ObjectId(groupId),
      },
    },
    {
      $group: {
        _id: "$date",
      },
    },
    {
      $sort: { _id: 1 },
    },
  ]).exec();

  return attendanceDates.map((record: any) => record._id);
};
