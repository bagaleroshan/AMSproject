import { Router } from "express";

import {
  addStudentGroupController,
  createGroupController,
  deleteGroupController,
  readAllGroupController,
  readRelatedGroupController,
  readSpecificGroupController,
  updateGroupController,
} from "../Controllers/groupController";
import isAuthenticated from "../middleware/isAuthenticated";
import isAuthorized from "../middleware/isAuthorized";
import { createCarController, readAllCarController, updateCarController } from "../Controllers/carController";

export const carRouter = Router();

carRouter
  .route("/")
  .post(
   // isAuthenticated,
   // isAuthorized(["admin", "superAdmin"]),
    createCarController
  );

carRouter
  .route("/")
  .get(
    //isAuthenticated,
   // isAuthorized(["admin", "superAdmin"]),
    readAllCarController
  );

carRouter
  .route("/addStudent/:id")
  .patch(
   // isAuthenticated,
   // isAuthorized(["admin", "superAdmin"]),
    addStudentGroupController
  );

carRouter.route("/teacher").get(isAuthenticated, readRelatedGroupController);
carRouter
  .route("/:id")
  .get(
    isAuthenticated,
    isAuthorized(["teacher", "admin", "superAdmin"]),
    readSpecificGroupController
  )
  .patch(
    //isAuthenticated,
    //isAuthorized(["admin", "superAdmin"]),
    updateCarController
  )
  .delete(
    isAuthenticated,
    isAuthorized(["admin", "superAdmin"]),
    deleteGroupController
  );
