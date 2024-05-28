import { Router } from "express";
import {
  createSubjectController,
  deleteSubjectController,
  readAllSubjectController,
  readSpecificSubjectController,
  updateSubjectController,
} from "../Controllers/subjectController";
import { validation } from "../middleware/validation";
import { subjectValidation } from "../validation/subjectValidation";
import validateQueryParams from "../middleware/validateQueryParams";

export const subjectRouter = Router();

subjectRouter
  .route("/")
  .post(validation(subjectValidation), createSubjectController)
  .get(
    validateQueryParams(["subjectName", "subjectCode", "query"]),
    readAllSubjectController
  );

subjectRouter
  .route("/:id")
  .get(readSpecificSubjectController)
  .patch(updateSubjectController)
  .delete(deleteSubjectController);
