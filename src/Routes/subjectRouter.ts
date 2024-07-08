import { Router } from "express";
import {
  createSubjectController,
  deleteSubjectController,
  readAllSubjectController,
  readSpecificSubjectController,
  updateSubjectController,
} from "../Controllers/subjectController";
import isAuthenticated from "../middleware/isAuthenticated";
import isAuthorized from "../middleware/isAuthorized";
import validateQueryParams from "../middleware/validateQueryParams";
import { validation } from "../middleware/validation";
import { subjectValidation } from "../validation/subjectValidation";

export const subjectRouter = Router();

subjectRouter
  .route("/")
  .post(
    isAuthenticated,
    isAuthorized(["admin", "superAdmin"]),
    validation(subjectValidation({ isCreate: true })),
    createSubjectController
  )
  .get(
    isAuthenticated,
    isAuthorized(["admin", "superAdmin"]),
    validateQueryParams(["subjectName", "subjectCode", "query"]),
    readAllSubjectController
  );

subjectRouter
  .route("/:id")
  .get(
    isAuthenticated,
    isAuthorized(["admin", "superAdmin"]),
    readSpecificSubjectController
  )
  .patch(
    isAuthenticated,
    isAuthorized(["admin", "superAdmin"]),
    validation(subjectValidation({ isCreate: false })),
    updateSubjectController
  )
  .delete(
    isAuthenticated,
    isAuthorized(["admin", "superAdmin"]),
    deleteSubjectController
  );
