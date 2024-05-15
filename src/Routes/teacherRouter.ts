import { Router } from "express";
import {
  createStudentController,
  deleteStudentController,
  readAllStudentController,
  readSpecificStudentController,
  updateStudentController,
} from "../Controllers/studentController";
import { validation } from "../middleware/validation";
import { teacherValidation } from "../validation/teacherValidation";

export const studentRouter = Router();

studentRouter
  .route("/")
  .post(validation(teacherValidation), createStudentController)
  .get(readAllStudentController);

studentRouter
  .route("/:id")
  .get(readSpecificStudentController)
  .patch(updateStudentController)
  .delete(deleteStudentController);
