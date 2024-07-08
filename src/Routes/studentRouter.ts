import { Router } from "express";
import {
  createStudentController,
  deleteStudentController,
  readAllStudentController,
  readSpecificStudentController,
  updateStudentController,
} from "../Controllers/studentController";
import isAuthenticated from "../middleware/isAuthenticated";
import isAuthorized from "../middleware/isAuthorized";
import { validation } from "../middleware/validation";
import { studentValidation } from "../validation/studentValidation";

export const studentRouter = Router();
export const numRouter = Router();

studentRouter
  .route("/")
  .post(
    isAuthenticated,
    isAuthorized(["admin", "superAdmin"]),
    validation(studentValidation),
    createStudentController
  )
  .get(isAuthenticated, readAllStudentController);

studentRouter
  .route("/:id")
  .get(isAuthenticated, readSpecificStudentController)
  .patch(
    isAuthenticated,
    isAuthorized(["admin", "superAdmin"]),
    updateStudentController
  )
  .delete(
    isAuthenticated,
    isAuthorized(["admin", "superAdmin"]),
    deleteStudentController
  );
