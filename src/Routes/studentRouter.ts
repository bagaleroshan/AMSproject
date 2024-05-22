import { Router } from "express";
import {
  createStudentController,
  deleteStudentController,
  readAllStudentController,
  readSpecificStudentController,
  updateStudentController,
} from "../Controllers/studentController";
import { studentValidation } from "../validation/studentValidation";
import { validateQueryParams, validation } from "../middleware/validation";

export const studentRouter = Router();
export const numRouter = Router();

studentRouter
  .route("/")
  .post(validation(studentValidation), createStudentController)
  .get(validateQueryParams(['apple']),readAllStudentController);

studentRouter
  .route("/:id")
  .get(readSpecificStudentController)
  .patch(updateStudentController)
  .delete(deleteStudentController);
