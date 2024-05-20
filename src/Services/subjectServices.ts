import { Subject } from "../Schema/model";

export const createSubjectService = async (data: {}) => {
  return await Subject.create(data);
};

export const readAllSubjectService = async (
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
  let result = await Subject.paginate(find, options);
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

export let readSpecificSubjectService = async (id: string) => {
  return await Subject.findById(id);
};

export let updateSubjectService = async (id: string, data: {}) => {
  return await Subject.findByIdAndUpdate(id, data, { new: true });
};

export let deleteSubjectService = async (id: string) => {
  return await Subject.findByIdAndDelete(id);
};
