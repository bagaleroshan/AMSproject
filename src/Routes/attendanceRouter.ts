import { Router } from "express";

import {
  createAttendanceController,
  readAllAttendanceController,
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
    isAuthorized(["teacher", "admin", "superAdmin"]),
    createAttendanceController
  );
// .delete(
//   isAuthenticated,
//   isAuthorized(["admin", "superAdmin"]),
//   deleteAttendanceController
// );
