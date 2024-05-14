import { Router } from "express";
import {
  createSubjectController,
  deleteSubjectController,
  readAllSubjectController,
  readSpecificSubjectController,
  updateSubjectController,
} from "../Controllers/subjectController";

export const subjectRouter = Router();

subjectRouter
  .route("/")
  .post(createSubjectController)
  .get(readAllSubjectController);

subjectRouter
  .route("/:id")
  .get(readSpecificSubjectController)
  .patch(updateSubjectController)
  .delete(deleteSubjectController)
