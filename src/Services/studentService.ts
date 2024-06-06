import { Student } from "../Schema/model";
import { searchAndPaginate } from "../utils/searchAndPaginate";

let createStudentService = async (data: {}) => {
  return await Student.create(data);
};
interface Attendance {
  date: string;
  isPresent: boolean;
}
let readAllStudentService =  async (
  page: number,
  limit: number,
  sort: string,
  select: string,
  query: string,
  find: {}
) => {
  const studentFields = ["fullName", "email", "phoneNumber"];
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

async function addAttendance(studentId: string, newAttendance: Attendance) {
  try {
    const result = await Student.findByIdAndUpdate(
      studentId,
      { $push: { attendance: newAttendance } },
      { new: true, useFindAndModify: false }
    );

    if (result) {
      console.log('Attendance updated successfully:', result);
    } else {
      console.log('Student not found');
    }
  } catch (error) {
    console.error('Error updating attendance:', error);
  }
}
let deleteStudentService = async (id: string) => {
  return await Student.findByIdAndDelete(id);
};

export {
  createStudentService,
  readSpecificStudentService,
  readAllStudentService,
  updateStudentService,
  deleteStudentService,
  addAttendance
};
