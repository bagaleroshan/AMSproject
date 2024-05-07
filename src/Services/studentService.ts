import { Student } from "../Model/model";

let createStudentService = async (data: {}) => {
  return await Student.create(data);
};

let readStudentService = async () => {
  return await Student.find({});
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
  readStudentService,
  updateStudentService,
  deleteStudentService,
};
