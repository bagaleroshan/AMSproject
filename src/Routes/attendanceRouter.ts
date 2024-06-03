import { Router } from "express";

import {
  createAttendanceController,
  deleteAttendanceController,
  readAllAttendanceController,
  readSpecificAttendanceController,
} from "../Controllers/attendanceController";

export const attendanceRouter = Router();

attendanceRouter.route("/").post(
  // isAuthenticated,
  // isAuthorized(["admin", "superAdmin"]),
  createAttendanceController
);
// attendanceRouter.route("/").post(validation(attendanceValidation), createAttendanceController);

attendanceRouter.route("/").get(
  // isAuthenticated,
  // isAuthorized(["admin", "superAdmin"]),
  readAllAttendanceController
);

attendanceRouter
  .route("/:id")
  .get(
    // isAuthenticated,
    // isAuthorized(["admin", "superAdmin"]),
    readSpecificAttendanceController
  )
  .delete(
    // isAuthenticated,
    // isAuthorized(["admin", "superAdmin"]),
    deleteAttendanceController
  );
