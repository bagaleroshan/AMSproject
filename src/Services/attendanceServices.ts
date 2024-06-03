import { Attendance, Group } from "../Schema/model";
import { searchAndPaginate } from "../utils/searchAndPaginate";

interface IAttendance {
  studentId: string;
  status: boolean;
}

interface IGroupData {
  groupId: string;
  attendances: IAttendance[];
}

export const createAttendanceService = async (data: IGroupData) => {
  const { groupId, attendances } = data;

  // Find the group by ID
  const group = await Group.findById(groupId).populate("students.studentId");
  if (!group) {
    throw new Error("Group not found");
  }

  // Validate that all student IDs in the attendance request belong to the group
  const validStudentIds = group.students.map(
    (student: any) => student.studentId
  );
  const invalidStudents = attendances.filter(
    (attendance) => !validStudentIds.includes(attendance.studentId.toString())
  );
  if (invalidStudents.length > 0) {
    throw new Error("Student does not exist on this group.");
  }
  return await Attendance.create({
    date: new Date().toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    }),
    groupId,
    attendances,
  });
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
