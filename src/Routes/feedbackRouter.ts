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

export const feedbackRouter = Router();

feedbackRouter
  .route("/")
  .post(validation(feedbackValidation), createFeedbackController)
  .get(
    isAuthenticated,
    isAuthorized(["admin", "superAdmin", "teacher"]),
    readAllFeedbackController
  );

feedbackRouter
  .route("/teacher/:teacherId")

  .get(
    isAuthenticated,
    isAuthorized(["admin", "superAdmin", "teacher"]),
    getFeedbackByTeacherIdController
  );
feedbackRouter
  .route("/group/:groupId")
  .get(
    isAuthenticated,
    isAuthorized(["admin", "superAdmin", "teacher"]),
    getFeedbackByGroupIdController
  );

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
/**
 * @swagger
 * components:
 *        securitySchemes:
 *          bearerAuth:
 *           type: http
 *           scheme: bearer
 *           bearerFormat: JWT
 * /file/single:
 *   post:
 *     summary: Upload a file
 *     tags:
 *        - File
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: File uploaded successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: File uploaded successfully
 *       400:
 *         description: No file uploaded
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: No file uploaded
 * /file/multiple:
 *   post:
 *     summary: Upload a file
 *     tags:
 *        - File
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               files:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *     responses:
 *       200:
 *         description: File uploaded successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: File uploaded successfully
 *       400:
 *         description: No file uploaded
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: No file uploaded
 * /file/{fileName}:
 *   delete:
 *     summary: Delete a file
 *     description: delets a file
 *     parameters:
 *       - in: path
 *         name: fileName
 *         required: true
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: A list of attendance records
 *     tags:
 *       - File
 *
 *
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - userName
 *         - email
 *         - password
 *         - phoneNumber
 *         - role
 *       properties:
 *         userName:
 *           type: string
 *           description: Full name of the user
 *         email:
 *           type: string
 *           format: email
 *           description: Email address of the user
 *         password:
 *           type: string
 *           format: password
 *           description: Password of the user
 *         phoneNumber:
 *           type: string
 *           description: Phone number of the user
 *         role:
 *           type: string
 *           description: Role of the user (e.g., admin, user)
 *         isPasswordChanged:
 *           type: boolean
 *           default: false
 *           description: Flag indicating if the password has been changed by the user
 *       example:
 *         userName: John Doe
 *         email: john.doe@example.com
 *         password: password123
 *         phoneNumber: "+1234567890"
 *         role: user
 */
