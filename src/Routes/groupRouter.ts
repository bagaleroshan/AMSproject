import { Router } from "express";

import {
  addStudentGroupController,
  changeTeacherInGroupController,
  createGroupController,
  deleteGroupController,
  readAllGroupController,
  readRelatedGroupController,
  readSpecificGroupController,
  updateGroupController,
} from "../Controllers/groupController";
import isAuthenticated from "../middleware/isAuthenticated";
import isAuthorized from "../middleware/isAuthorized";

export const groupRouter = Router();

groupRouter
  .route("/")
  .post(
    isAuthenticated,
    isAuthorized(["admin", "superAdmin"]),
    createGroupController
  );

groupRouter
  .route("/")
  .get(
    isAuthenticated,
    isAuthorized(["admin", "superAdmin"]),
    readAllGroupController
  );

groupRouter
  .route("/addStudent/:id")
  .patch(
    isAuthenticated,
    isAuthorized(["admin", "superAdmin"]),
    addStudentGroupController
  );
groupRouter
  .route("/changeTeacher/:id")
  .patch(
    isAuthenticated,
    isAuthorized(["admin", "superAdmin"]),
    changeTeacherInGroupController
  );
groupRouter.route("/teacher").get(isAuthenticated, readRelatedGroupController);
groupRouter
  .route("/:id")
  .get(
    isAuthenticated,
    isAuthorized(["admin", "superAdmin"]),
    readSpecificGroupController
  )
  .patch(
    isAuthenticated,
    isAuthorized(["admin", "superAdmin"]),
    updateGroupController
  )
  .delete(
    isAuthenticated,
    isAuthorized(["admin", "superAdmin"]),
    deleteGroupController
  );
