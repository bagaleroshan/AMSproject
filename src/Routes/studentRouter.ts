import { Router } from "express";
import {
  createStudentController,
  deleteStudentController,
  readAllStudentController,
  readSpecificStudentController,
  updateStudentController,
} from "../Controllers/studentController";
import isAuthenticated from "../middleware/isAuthenticated";
import isAuthorized from "../middleware/isAuthorized";
import { validation } from "../middleware/validation";
import { studentValidation } from "../validation/studentValidation";

export const studentRouter = Router();
export const numRouter = Router();

studentRouter
  .route("/")
  .post(
    isAuthenticated,
    isAuthorized(["admin", "superAdmin"]),
    validation(studentValidation),
    createStudentController
  )
  .get(isAuthenticated, readAllStudentController);

studentRouter
  .route("/:id")
  .get(isAuthenticated, readSpecificStudentController)
  .patch(
    isAuthenticated,
    isAuthorized(["admin", "superAdmin"]),
    updateStudentController
  )
  .delete(
    isAuthenticated,
    isAuthorized(["admin", "superAdmin"]),
    deleteStudentController
  );


  /**
 * @swagger
 * components:
 *        securitySchemes:
 *          bearerAuth:
 *           type: http
 *           scheme: bearer
 *           bearerFormat: JWT
 * /students:
 *   get:
 *     summary: Retrieve students
 *     description: Retrieves a list of students records with pagination support or studentId.
 *     security:
 *       - bearerAuth: []     
 *     parameters:
 *       - in: query
 *         name: sort
 *         schema:
 *           type: string
 *         description: Filter users by role (e.g., admin, user)
 *       - in: query
 *         name: fullName
 *         schema:
 *           type: string
 *         description: Filter users by status (e.g., active, inactive)
 *       - in: query
 *         name: course
 *         required: true
 *         schema:
 *           type: string
 *         description: JWT token for authentication
 *       - in: query
 *         name: phoneNumber
 *         required: true
 *         schema:
 *           type: string
 *         description: JWT token for authentication
 *       - in: query
 *         name: phoneNumber
 *         required: true
 *         schema:
 *           type: string
 *         description: JWT token for authentication
 *     responses:
 *       '200':
 *         description: A list of attendance records
 *     tags:
 *       - Students
 *   post:
 *     summary: Create a new user 
 *     description: Create a new user with the specified data.
 *     tags:
 *        - Students
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Student'
 * /students/{id}:
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
 *       - Students
 *   
 *   patch:
 *     summary: Update a  user 
 *     description: Update a  user with the specified data.
 *     tags:
 *        - Students
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Student'
 *     responses:
 *       200:
 *         description: OK
 *   delete:
 *     summary: Delete a  user 
 *     description: Delete a  user 
 *     tags:
 *        - Students
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Student'
 *     responses:
 *       200:
 *         description: OK
 *    
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Student:
 *       type: object
 *       required:
 *         - fullName
 *         - email
 *         - phoneNumber
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
 *         phoneNumber: "+1234567890"
 */