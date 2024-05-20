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

export const subjectRouter = Router();

subjectRouter
  .route("/")
  .post(validation(subjectValidation),createSubjectController)
  .get(readAllSubjectController);

subjectRouter
  .route("/:id")
  .get(readSpecificSubjectController)
  .patch(updateSubjectController)
  .delete(deleteSubjectController)
