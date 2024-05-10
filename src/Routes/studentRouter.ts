import { Router } from "express";
import {
  createStudentController,
  deleteStudentController,
  readAllStudentController,
  readSpecificStudentController,
  updateStudentController,
} from "../controllers/studentController";

export const studentRouter = Router();

studentRouter
  .route("/")
  .post(createStudentController)
  .get(readAllStudentController);

studentRouter
  .route("/:id")
  .get(readSpecificStudentController)
  .patch(updateStudentController)
  .delete(deleteStudentController);
