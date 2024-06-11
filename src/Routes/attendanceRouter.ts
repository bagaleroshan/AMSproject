import { Router } from "express";

import {
  createAttendanceController,
  deleteAttendanceController,
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
    isAuthorized(["teacher", "admin"]),
    createAttendanceController
  )
  .delete(
    isAuthenticated,
    isAuthorized(["admin", "superAdmin"]),
    deleteAttendanceController
  );
