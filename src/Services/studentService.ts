import Student from "../Schema/studentSchema";

let createStudentService = async (data: {}) => {
  return await Student.create(data);
};

// let readAllStudentService = async () => {
//   try {
//     // page: number, limit: number

//     const options = {
//       page: 1,
//       limit: 10,
//     };
//     const result = await Student.paginate({}, options);
//     return result;
//   } catch (error) {}
//   // return await Student.find({});
// };

let readAllStudentService = async (page = 1, limit = 10) => {
  try {
    const options = {
      page,
      limit,
    };
    const result = await Student.paginate({}, options);

    const { docs, totalDocs, totalPages, page: currentPage } = result;
    const data = {
      results: docs,
      totalDataInAPage: docs.length,
      totalDataInWholePage: totalDocs,
      currentPage: currentPage,
      totalPage: totalPages,
      hasPreviousPage: currentPage > 1,
      hasNextPage: currentPage < totalPages,
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
