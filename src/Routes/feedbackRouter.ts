import { Router } from "express";

import { createFeedbackController, deleteFeedbackController, readAllFeedbackController, readSpecificFeedbackController, requestFeedbackController, updateFeedbackController } from "../Controllers/feedbackController";
import isAuthenticated from "../middleware/isAuthenticated";
import { feedbackValidation } from "../validation/feedbackValidation";
import { validation } from "../middleware/validation";

export const feedbackRouter = Router();

feedbackRouter
  .route("/")
  .post(
    isAuthenticated,
    validation(feedbackValidation),
    createFeedbackController
  )
  .get(isAuthenticated,readAllFeedbackController)

  feedbackRouter
  .route("/:id")
  .post(requestFeedbackController)
  .get(isAuthenticated,readSpecificFeedbackController)
  .patch(isAuthenticated,validation(feedbackValidation),updateFeedbackController)
  .delete(isAuthenticated,deleteFeedbackController)


