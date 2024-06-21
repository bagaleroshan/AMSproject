import mongoose from "mongoose";
import { Car, Group, Student } from "../Schema/model";
import { ILookup } from "../helper/interfaces";
import { searchAndPaginate } from "../utils/searchAndPaginate";

const { ObjectId } = mongoose.Types;
export const createCarService = async (data: {}) => {
  return await Car.create(data);
};

export const readAllCarService = async (
  page: number,
  limit: number,
  sort: string,
  select: string,
  query: string,
  find: {}
) => {
  const groupFields = [
    { field: "name", type: "string" },
    { field: "model", type: "string" },
    { field: "price", type: "string" },
    { field: "quantity", type: "string" },
  ];
  // const lookups: ILookup[] = [
  //   {
  //     from: "users",
  //     localField: "teacher",
  //     foreignField: "id",
  //     as: "teacher",
  //   },
  //   {
  //     from: "subjects",
  //     localField: "subject",
  //     foreignField: "id",
  //     as: "subject",
  //   },
  // ];
  const data = await searchAndPaginate(
    Car,
    page,
    limit,
    sort,
    select,
    query,
    find,
    groupFields,
   // lookups
  );
  return data;
};

export const readGroupsByTeacherId = async (
  page: number,
  limit: number,
  sort: string,
  select: string,
  query: string,
  find: {}
) => {
  const groupFields = [
    { field: "teacher", type: "string" },
    { field: "subject", type: "string" },
    { field: "groupName", type: "string" },
    { field: "startTime", type: "string" },
    { field: "endTime", type: "string" },
  ];
  const lookups: ILookup[] = [
    {
      from: "subjects",
      localField: "subject",
      foreignField: "id",
      as: "subject",
    },
  ];
  const data = await searchAndPaginate(
    Car,
    page,
    limit,
    sort,
    select,
    query,
    find,
    groupFields,
    lookups
  );
  return data;
};

export let readSpecificCarService = async (id: string) => {
  return await Car.findById(id)
};

export let updateCarService = async (id: string, data: {}) => {
  return await Car.findByIdAndUpdate(id, data, { new: true });
};

export let deleteCarService = async (id: string) => {
  return await Car.findByIdAndDelete(id);
};
export const addStudentCarService = async (
  id: string,
  students: string[]
) => {
  const group = await Group.findById(id);
  if (!group) {
    throw new Error("Group not found");
  } else {
    let outStudent = [
      ...new Set([
        ...group.students.map((student: any) => student.toString()),
        ...students,
      ]),
    ];
    let updatedGroup = await Group.findByIdAndUpdate(
      id,
      { students: outStudent },
      { new: true }
    );
    for (const studentId of students) {
      await Student.findByIdAndUpdate(
        studentId,
        { $addToSet: { groups: id } },
        { new: true }
      );
    }
    return updatedGroup;
  }
};
