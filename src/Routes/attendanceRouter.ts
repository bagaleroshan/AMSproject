import { Router } from "express";

import {
  createAttendanceController,
  getGroupAttendanceDataController,
  getMonthlyAttendanceReportController,
  getTodayAttendanceGroupsCountController,
  readAllAttendanceController,
  readSpecificAttendanceController,
  updateSpecificAttendanceController,
} from "../Controllers/attendanceController";
import isAuthenticated from "../middleware/isAuthenticated";
import isAuthorized from "../middleware/isAuthorized";

export const attendanceRouter = Router();

attendanceRouter
  .route("/")
  .get(
    isAuthenticated,
    isAuthorized(["teacher", "admin", "superAdmin"]),
    readAllAttendanceController
  );

attendanceRouter
  .route("/monthly-report")
  .get(
    isAuthenticated,
    isAuthorized(["teacher", "admin", "superAdmin"]),
    getMonthlyAttendanceReportController
  );

attendanceRouter
  .route("/attendance-taken-groups")
  .get(
    isAuthenticated,
    isAuthorized(["admin", "superAdmin"]),
    getTodayAttendanceGroupsCountController
  );
attendanceRouter
  .route("/:groupId")
  .post(
    isAuthenticated,
    isAuthorized(["teacher", "admin", "superAdmin"]),
    createAttendanceController
  )
  .patch(
    isAuthenticated,
    isAuthorized(["superAdmin", "admin"]),
    updateSpecificAttendanceController
  )
  .get(
    isAuthenticated,
    isAuthorized(["admin", "superAdmin"]),
    getGroupAttendanceDataController
  );
/**
 * @swagger
 * components:
 *        securitySchemes:
 *          bearerAuth:
 *           type: http
 *           scheme: bearer
 *           bearerFormat: JWT
 * /groups/attendances:
 *   get:
 *     summary: Retrieve paginated attendance records
 *     description: Retrieves a list of attendance records with pagination support. Can be filtered by groupId or studentId.
 *     security:
 *       - bearerAuth: []     
 *     responses:
 *       '200':
 *         description: A list of attendance records
 *     tags:
 *       - Attendence
 * /groups/attendances/{id}:
 *   get:
 *     summary: Retrieve paginated attendance records
 *     description: Retrieves a list of attendance records with pagination support. Can be filtered by groupId or studentId.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: false
 *     security:
 *       - bearerAuth: []     
 *     responses:
 *       '200':
 *         description: A list of attendance records
 *     tags:
 *       - Attendence
 *   
 *   patch:
 *     summary: Update a  user 
 *     description: Update a  user with the specified data.
 *     tags:
 *        - Attendance
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Attendance'
 *     responses:
 *       200:
 *         description: OK
 *   delete:
 *     summary: Delete a  user 
 *     description: Delete a  user 
 *     tags:
 *        - Attendence
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
 * /groups/attendances/monthly-report:
 *   get:
 *         summary: User login
 *         description: Authenticate user credentials and obtain a token.
 *         tags:
 *          - Attendence
 *         requestBody:
 *          required: false
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
 * /groups/attendances/attendance-taken-groups:
 *   get:
 *         summary: User login
 *         description: Authenticate user credentials and obtain a token.
 *         tags:
 *          - Attendence
 *         requestBody:
 *          required: false
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
 *     Attendance:
 *       type: object
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
 *         date: ''
 *         groupId: ''
 *         studentId: ''
 *         status: ''
 *         role: user
 */
