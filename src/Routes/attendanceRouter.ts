import { Router } from "express";

import {
  createAttendanceController,
  readAllAttendanceController,
  readSpecificStudentController,
  updateSpecificStudentController,
} from "../Controllers/attendanceController";
import isAuthenticated from "../middleware/isAuthenticated";
import isAuthorized from "../middleware/isAuthorized";

export const attendanceRouter = Router();

attendanceRouter
  .route("/")
  .get(
    isAuthenticated,
    isAuthorized(["admin", "superAdmin"]),
    readAllAttendanceController
  );

attendanceRouter
  .route("/:groupId")
  .post(
    isAuthenticated,
    isAuthorized(["teacher", "admin"]),
    createAttendanceController
  
  )
  .patch(
   // isAuthenticated,
   // isAuthorized(["teacher", "admin"]),
    updateSpecificStudentController
  
  )
  .get(
    isAuthenticated,
    isAuthorized(["admin", "superAdmin"]),
    readSpecificStudentController  );
// .delete(
//   isAuthenticated,
//   isAuthorized(["admin", "superAdmin"]),
//   deleteAttendanceController
// );
