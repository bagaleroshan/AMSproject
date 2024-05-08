import { Request, Response } from "express";
import {
  createStudentService,
  deleteStudentService,
  readAllStudentService,
  readSpecificStudentService,
  updateStudentService,
} from "../Services/studentService";

interface ISearchQuery {
  fullName?: string;
  course?: string;
}

export const createStudentController = async (req: Request, res: Response) => {
  try {
    let result = await createStudentService(req.body);
    res.status(201).json({
      success: true,
      message: "Student created successfully",
      result: result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: (error as Error).message,
    });
  }
};

export const myMongooseQuerys = (query: {}) => {
  let { page, limit, sort, ...find } = query;
  limit = Number(limit) || 10;
  page = Number(page) || 1;
  sort = String(sort || "-createdAt").replaceAll(",", " ");

  return {
    page,
    limit,
    sort,
    find,
  };
};

export const readAllStudentController = async (req: Request, res: Response) => {
  /* 
  

  http://localhost:8000/students?course=&fullName=nitan&age=30&isMarried= true
  


  let {page,limit,sort,select,populate,...find} = req.query
  //{fullName="nitan",age=30,&isMarried=true}
  */

  try {
    let { page, limit, sort, find } = myMongooseQuerys(req.query);
    let result = await readAllStudentService(
      Number(page) || 1,
      Number(limit) || 10,
      sort as string,
      find
    );
    res.status(200).json({
      success: true,
      message: "Student read successfully",
      result: result,
    });
  } catch (error) {
    res.status(400).json({
      success: true,
      message: (error as Error).message,
    });
  }
};

export const readSpecificStudentController = async (
  req: Request,
  res: Response
) => {
  try {
    let result = await readSpecificStudentService(req.params.id);
    res.status(200).json({
      success: true,
      message: "Successfully read a student",
      result: result,
    });
  } catch (error) {
    res.status(400).json({
      success: true,
      message: (error as Error).message,
    });
  }
};

export const updateStudentController = async (req: Request, res: Response) => {
  try {
    let result = await updateStudentService(req.params.id, req.body);
    res.status(201).json({
      success: true,
      message: "student updated successfully",
      result: result,
    });
  } catch (error) {
    res.status(400).json({
      success: true,
      message: (error as Error).message,
    });
  }
};
export const deleteStudentController = async (req: Request, res: Response) => {
  try {
    let result = await deleteStudentService(req.params.id);
    res.status(201).json({
      success: true,
      message: "student deleted successfully",
      result: result,
    });
  } catch (error) {
    res.status(400).json({
      success: true,
      message: (error as Error).message,
    });
  }
};
