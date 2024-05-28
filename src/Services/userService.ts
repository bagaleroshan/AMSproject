import { User } from "../Schema/model";
import { searchAndPaginate } from "../utils/searchAndPaginate";

export let createUserService = async (data: {}) => {
  return await User.create(data);
};
export const readAllUserService = async (
  page: number,
  limit: number,
  sort: string,
  select: string,
  query: string,
  find: {}
) => {
  const userFields = ["fullName", "email", "phoneNumber", "role"];
  const data = await searchAndPaginate(
    User,
    page,
    limit,
    sort,
    select,
    query,
    find,
    userFields
  );
  return data;
};

// let readAllUserService = async (
//   page: number,
//   limit: number,
//   sort: string,
//   select: string,
//   find: {}
// ) => {
//   const options = {
//     page,
//     limit,
//     sort,
//     select,
//   };
//   const result = await User.paginate(find, options);
//   const {
//     docs,
//     totalDocs,
//     totalPages,
//     page: currentPage,
//     hasPrevPage,
//     hasNextPage,
//   } = result;
//   const data = {
//     results: docs,
//     totalDataInAPage: docs.length,
//     totalDataInWholePage: totalDocs,
//     currentPage: currentPage,
//     totalPages: totalPages,
//     hasPreviousPage: hasPrevPage,
//     hasNextPage: hasNextPage,
//   };

//   return data;
// };
export let readSpecificUserService = async (id: string) => {
  return await User.findById(id);
};

export let updateUserService = async (id: string, data: {}) => {
  return await User.findByIdAndUpdate(id, data, { new: true });
};

export let deleteUserService = async (id: string) => {
  return await User.findByIdAndDelete(id);
};
