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


  /**
 * @swagger
 * components:
 *        securitySchemes:
 *          bearerAuth:
 *           type: http
 *           scheme: bearer
 *           bearerFormat: JWT
 * /subjects:
 *   get:
 *     summary: Retrieve subjects
 *     description: Retrieves a list of Sujects records with pagination support.
 *     security:
 *       - bearerAuth: []     
 *     responses:
 *       '200':
 *         description: A list of attendance records
 *     tags:
 *       - Subjects
 *   post:
 *     summary: Create a new Subject 
 *     description: Create a new Subject with the specified data.
 *     tags:
 *        - Subjects
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Subjects'
 *     responses:
 *       '200':
 *         description: A list of sujects records
 * /subjects/{id}:
 *   get:
 *     summary: Retrieve paginated attendance records
 *     description: Retrieves a list of attendance records with pagination support. Can be filtered by groupId or studentId.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *     security:
 *       - bearerAuth: []     
 *     responses:
 *       '200':
 *         description: A list of attendance records
 *     tags:
 *       - Subjects
 *   
 *   patch:
 *     summary: Update a  user 
 *     description: Update a  user with the specified data.
 *     tags:
 *        - Subjects
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Subjects'
 *     responses:
 *       200:
 *         description: OK
 *   delete:
 *     summary: Delete a  Subject 
 *     description: Delete a  Subject 
 *     tags:
 *        - Subjects
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Subjects:
 *       type: object
 *       properties:
 *         subjectName:
 *           type: string
 *           description: Full name of the user
 *         subjectCode:
 *           type: string
 *           format: email
 *           description: Email address of the user
 *         numberOfClasses:
 *           type: string
 *           format: password
 *           description: Password of the user
 *       example:
 *         subjectName: John Doe
 *         subjectCode: john.doe@example.com
 *         numberOfClasses: 123
 */
