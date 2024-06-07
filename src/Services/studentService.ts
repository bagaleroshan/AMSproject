import { Student } from "../Schema/model";
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
  return await Student.findByIdAndDelete(id);
};

export {
  createStudentService,
  readSpecificStudentService,
  readAllStudentService,
  updateStudentService,
  deleteStudentService,
};
