import { Router } from "express";

import {
  createFeedbackController,
  deleteFeedbackController,
  getFeedbackByGroupIdController,
  getFeedbackByTeacherIdController,
  readAllFeedbackController,
  readSpecificFeedbackController,
  requestFeedbackController,
  updateFeedbackController,
} from "../Controllers/feedbackController";
import isAuthenticated from "../middleware/isAuthenticated";
import { feedbackValidation } from "../validation/feedbackValidation";
import { validation } from "../middleware/validation";
import isAuthorized from "../middleware/isAuthorized";
import { getFeedbackByGroupIdService } from "../Services/feedbackServices";

export const feedbackRouter = Router();

feedbackRouter
  .route("/")
  .post(validation(feedbackValidation), createFeedbackController)
  .get(
    isAuthenticated,
    isAuthorized(["admin", "superAdmin"]),
    readAllFeedbackController
  );

feedbackRouter
  .route("/teacher/:teacherId")

  .get(
    isAuthenticated,
    isAuthorized(["admin", "superAdmin"]),
    getFeedbackByTeacherIdController
  );

feedbackRouter
  .route("/group/:groupId")
  .get(isAuthenticated,
    isAuthorized(["admin", "superAdmin"]),getFeedbackByGroupIdController)


feedbackRouter
  .route("/:id")
  .post(requestFeedbackController)
  .get(isAuthenticated, readSpecificFeedbackController)
  .patch(
    isAuthenticated,
    validation(feedbackValidation),
    updateFeedbackController
  )
  .delete(isAuthenticated, deleteFeedbackController);
