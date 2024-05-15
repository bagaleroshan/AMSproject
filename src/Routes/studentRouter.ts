import { Router } from "express";
import {
  createStudentController,
  deleteStudentController,
  readAllStudentController,
  readSpecificStudentController,
  updateStudentController,
} from "../Controllers/studentController";
import { studentValidation } from "../validation/studentValidation";
import { validation } from "../middleware/validation";

export const studentRouter = Router();

studentRouter
  .route("/")
  .post(validation(studentValidation), createStudentController)
  .get(readAllStudentController);

studentRouter
  .route("/:id")
  .get(readSpecificStudentController)
  .patch(updateStudentController)
  .delete(deleteStudentController);
