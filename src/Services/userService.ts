import { User } from "../Schema/model";

let createUserService = async (data: {}) => {
  return await User.create(data);
};

let readAllUserService = async (
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
  };
  const result = await User.paginate(find, options);
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
let readSpecificUserService = async (id: string) => {
  return await User.findById(id);
};

let updateUserService = async (id: string, data: {}) => {
  return await User.findByIdAndUpdate(id, data, { new: true });
};

let deleteUserService = async (id: string) => {
  return await User.findByIdAndDelete(id);
};

export {
  createUserService,
  readSpecificUserService,
  readAllUserService,
  updateUserService,
  deleteUserService,
};
