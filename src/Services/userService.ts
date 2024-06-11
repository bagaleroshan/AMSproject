import { Group, User } from "../Schema/model";
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
  const userFields = [
    { field: "fullName", type: "string" },
    { field: "email", type: "string" },
    { field: "phoneNumber", type: "string" },
    { field: "role", type: "string" },
  ];
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

export let readSpecificUserService = async (id: string) => {
  return await User.findById(id);
};

export let updateUserService = async (id: string, data: {}) => {
  return await User.findByIdAndUpdate(id, data, { new: true });
};

export let deleteUserService = async (id: string, loggedInUserId: string) => {
  if (id === loggedInUserId) {
    throw new Error("You cannot delete yourself.");
  }
  const teacherAssignedToGroup = await Group.findOne({
    teacher: id,
  });
  console.log("results", teacherAssignedToGroup);
  if (teacherAssignedToGroup) {
    throw new Error(
      "Teacher cannot be deleted as it is associated with a group."
    );
  }
  return await User.findByIdAndDelete(id);
};
