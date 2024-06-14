import { Attendance, Group, Student } from "../Schema/model";
import { searchAndPaginate } from "../utils/searchAndPaginate";

let createStudentService = async (data: {}) => {
  return await Student.create(data);
};

let readAllStudentService = async (
  page: number,
  limit: number,
  sort: string,
  select: string,
  query: string,
  find: {}
) => {
  const studentFields = [
    { field: "fullName", type: "string" },
    { field: "email", type: "string" },
    { field: "phoneNumber", type: "string" },
  ];
  const data = await searchAndPaginate(
    Student,
    page,
    limit,
    sort,
    select,
    query,
    find,
    studentFields
  );
  return data;
};
let readSpecificStudentService = async (id: string) => {
  return await Student.findById(id);
};

let updateStudentService = async (id: string, data: {}) => {
  return await Student.findByIdAndUpdate(id, data, { new: true });
};

let deleteStudentService = async (id: string) => {
  const studentAssignedToGroup = await Group.findOne({
    students: id,
  });
  const attendanceCount = await Attendance.countDocuments({
    studentId: id,
    status: true,
  });

  if (studentAssignedToGroup && attendanceCount >= 15) {
    throw new Error("Student cannot be deleted as are assigned to a group.");
  }
  const deletedStudent = await Student.findByIdAndDelete(id);
  if (!deletedStudent) {
    throw new Error("Student not found.");
  }
  return deletedStudent;
};

export {
  createStudentService,
  readSpecificStudentService,
  readAllStudentService,
  updateStudentService,
  deleteStudentService,
};
