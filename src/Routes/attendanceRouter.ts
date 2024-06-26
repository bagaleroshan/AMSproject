import { Router } from "express";

import {
  createAttendanceController,
  getMonthlyAttendanceReportController,
  readAllAttendanceController,
  readSpecificAttendanceController,
  updateSpecificAttendanceController,
} from "../Controllers/attendanceController";
import isAuthenticated from "../middleware/isAuthenticated";
import isAuthorized from "../middleware/isAuthorized";

export const attendanceRouter = Router();

attendanceRouter
  .route("/")
  .get(
    isAuthenticated,
    isAuthorized(["teacher", "admin", "superAdmin"]),
    readAllAttendanceController
  );

attendanceRouter
  .route("/monthly-report")
  .get(
    isAuthenticated,
    isAuthorized(["teacher", "admin", "superAdmin"]),
    getMonthlyAttendanceReportController
  );
attendanceRouter
  .route("/:groupId")
  .post(
    isAuthenticated,
    isAuthorized(["teacher", "admin", "superAdmin"]),
    createAttendanceController
  )
  .patch(
    isAuthenticated,
    isAuthorized(["superAdmin", "admin"]),
    updateSpecificAttendanceController
  )
  .get(
    isAuthenticated,
    isAuthorized(["admin", "superAdmin"]),
    readSpecificAttendanceController
  );
// .delete(
//   isAuthenticated,
//   isAuthorized(["admin", "superAdmin"]),
//   deleteAttendanceController
// );
