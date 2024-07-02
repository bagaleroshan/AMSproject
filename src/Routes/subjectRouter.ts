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
 *     description: Retrieves a list of attendance records with pagination support. Can be filtered by groupId or studentId.
 *     security:
 *       - bearerAuth: []     
 *     responses:
 *       '200':
 *         description: A list of attendance records
 *     tags:
 *       - Subjects
 *   post:
 *     summary: Create a new user 
 *     description: Create a new user with the specified data.
 *     tags:
 *        - Subjects
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 * 
 *   delete:
 *     summary: Delete a  user 
 *     description: Delete a  user 
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
 * /users/{id}:
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
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: OK
 *   delete:
 *     summary: Delete a  user 
 *     description: Delete a  user 
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
 * /users/login:
 *   post:
 *         summary: User login
 *         description: Authenticate user credentials and obtain a token.
 *         tags:
 *          - Subjects
 *         requestBody:
 *          required: true
 *          content:
 *            application/json:
 *              schema:
 *               type: object
 *               properties:
 *                 username:
 *                  type: string
 *                 password:
 *                  type: string
 *         responses:
 *               '200':
 *                description: Login successful. Returns a token.

 *    

 */

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - fullName
 *         - email
 *         - password
 *         - phoneNumber
 *         - role
 *       properties:
 *         fullName:
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
 *         fullName: John Doe
 *         email: john.doe@example.com
 *         password: password123
 *         phoneNumber: "+1234567890"
 *         role: user
 */
