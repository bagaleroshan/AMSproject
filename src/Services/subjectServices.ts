import { Subject } from "../Schema/model";
import { searchAndPaginate } from "../utils/searchAndPaginate";

export const createSubjectService = async (data: {}) => {
  return await Subject.create(data);
};

export const readAllSubjectService = async (
  page: number,
  limit: number,
  sort: string,
  select: string,
  query: string,
  find: {}
) => {
  const subjectFields = ["subjectName", "subjectCode", "numberOfClasses"];
  const data = await searchAndPaginate(
    Subject,
    page,
    limit,
    sort,
    select,
    query,
    find,
    subjectFields
  );
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
