import { Router } from "express";

import {
  createGroupController,
  deleteGroupController,
  readAllGroupController,
  readSpecificGroupController,
  updateGroupController,
} from "../Controllers/groupController";
import isAuthenticated from "../middleware/isAuthenticated";
import isAuthorized from "../middleware/isAuthorized";

export const groupRouter = Router();

groupRouter.route("/").post(
  // isAuthenticated,
  // isAuthorized(["admin", "superAdmin"]),
  createGroupController
);
// groupRouter.route("/").post(validation(groupValidation), createGroupController);

groupRouter.route("/").get(
  // isAuthenticated,
  // isAuthorized(["admin", "superAdmin"]),
  readAllGroupController
);
groupRouter
  .route("/:id")
  .get(
    // isAuthenticated,
    // isAuthorized(["admin", "superAdmin"]),
    readSpecificGroupController
  )
  .patch(
    // isAuthenticated,
    // isAuthorized(["admin", "superAdmin"]),
    updateGroupController
  )
  .delete(
    // isAuthenticated,
    // isAuthorized(["admin", "superAdmin"]),
    deleteGroupController
  );
