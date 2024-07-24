import { Attendance, Group, Student } from "../Schema/model";
import { searchAndPaginate } from "../utils/searchAndPaginate";

export let createStudentService = async (data: {}) => {
  return await Student.create(data);
};

export let readAllStudentService = async (
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
    { field: "groups", type: "string" },
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
export let readSpecificStudentService = async (id: string) => {
  return await Student.findById(id);
};

export let updateStudentService = async (id: string, data: {}) => {
  return await Student.findByIdAndUpdate(id, data, { new: true });
};

export let deleteStudentService = async (id: string) => {
  const studentAssignedToGroup = await Group.find({
    students: id,
  });
  if (studentAssignedToGroup.length > 0) {
    throw new Error("Student cannot be deleted as are assigned to a group.");
  }
  await Attendance.deleteMany({ studentId: id });
  await Group.updateMany({ students: id }, { $pull: { students: id } });
  const deletedStudent = await Student.findByIdAndDelete(id);
  if (!deletedStudent) {
    throw new Error("Student not found.");
  }
  return deletedStudent;
};
