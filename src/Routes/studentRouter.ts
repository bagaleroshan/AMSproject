import { Router } from "express";
import {
  addStudentAttendenceController,
  createStudentController,
  deleteStudentController,
  readAllStudentController,
  readSpecificStudentController,
  updateStudentController,
} from "../Controllers/studentController";
import { studentValidation } from "../validation/studentValidation";
import { validateQueryParams, validation } from "../middleware/validation";
import isAuthenticated from "../middleware/isAuthenticated";
import isAuthorized from "../middleware/isAuthorized";
import { addAttendance } from "../Services/studentService";

export const studentRouter = Router();
export const numRouter = Router();

studentRouter
  .route("/")
  .post(validation(studentValidation), createStudentController)
  .get(readAllStudentController);

studentRouter
  .route("/attend/:id")
  .get(isAuthenticated,
    isAuthorized(["admin", "superAdmin"]),readSpecificStudentController)
  .patch(isAuthenticated,
    isAuthorized(["admin", "superAdmin"]),addStudentAttendenceController)
  .delete(isAuthenticated,
    isAuthorized(["admin", "superAdmin"]),deleteStudentController);
studentRouter
  .route("/:id")
  .get(isAuthenticated,
    isAuthorized(["admin", "superAdmin"]),readSpecificStudentController)
  .patch(isAuthenticated,
    isAuthorized(["admin", "superAdmin"]),updateStudentController)
  .delete(isAuthenticated,
    isAuthorized(["admin", "superAdmin"]),deleteStudentController);
