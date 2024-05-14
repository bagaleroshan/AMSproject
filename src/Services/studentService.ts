import Student from "../Schema/model";

let createStudentService = async (data: {}) => {
  return await Student.create(data);
};

let readAllStudentService = async (
  page: number,
  limit: number,
  sort: string,
  select: string,
  find: {}
) => {
  const options = {
    page,
    limit,
    sort,
    select,
    // populate: { path: "author", select: "username email" },
  };
  const result = await Student.paginate(find, options);
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
