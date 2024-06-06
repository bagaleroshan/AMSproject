import { Router } from "express";

import {
  createAttendanceController,
  deleteAttendanceController,
  readAllAttendanceController,
  readSpecificAttendanceController,
} from "../Controllers/attendanceController";
import isAuthenticated from "../middleware/isAuthenticated";
import isAuthorized from "../middleware/isAuthorized";

export const attendanceRouter = Router();

// attendanceRouter.route("/").post(
//   // isAuthenticated,
//   // isAuthorized(["admin", "superAdmin"]),
//   createAttendanceController
// );
// attendanceRouter.route("/").post(validation(attendanceValidation), createAttendanceController);

attendanceRouter.route("/").get(
  // isAuthenticated,
  // isAuthorized(["admin", "superAdmin"]),
  readAllAttendanceController
);

attendanceRouter
  .route("/:id")
  .post(
    isAuthenticated,
    // isAuthorized(["teacher"]),
    createAttendanceController
  )
  .delete(
    isAuthenticated,
    isAuthorized(["admin", "superAdmin"]),
    deleteAttendanceController
  );
