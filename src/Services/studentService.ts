import Student from "../Schema/studentSchema";

let createStudentService = async (data: {}) => {
  return await Student.create(data);
};
let readAllStudentService = async (page = 1, limit = 10) => {
  try {
    const options = {
      page,
      limit,
    };
    const result = await Student.paginate({}, options);
    const {
      docs,
      totalDocs,
      totalPages,
      page: currentPage,
      hasPrevPage,
      hasNextPage,
    } = result;
    const data = {
      results: docs,
      totalDataInAPage: docs.length,
      totalDataInWholePage: totalDocs,
      currentPage: currentPage,
      totalPages: totalPages,
      hasPreviousPage: hasPrevPage,
      hasNextPage: hasNextPage,
    };

    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
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
