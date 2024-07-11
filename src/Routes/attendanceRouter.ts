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
    isAuthorized(["teacher", "admin", "superAdmin"]),
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
 * /attendances:
 *   get:
 *     summary: Retrieve paginated attendance records
 *     description: Retrieves a list of attendance records with pagination support. Can be filtered by groupId or studentId.
 *     security:
 *       - bearerAuth: []     
 *     responses:
 *       '200':
 *         description: A list of attendance records
 *     tags:
 *       - Attendance
 * /attendances/{id}:
 *   post:
 *     summary: Retrieve paginated attendance record
 *     description: Retrieves a list of attendance records with pagination support. Can be filtered by groupId or studentId.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: false
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: success attendance records     
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Attendance'
 *     tags:
 *       - Attendance
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
 *       - Attendance
 *   
 *   patch:
 *     summary: Update a attendance 
 *     description: Update a  attendance with the specified data.
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
 *        - Attendance
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: false
 *     responses:
 *       200:
 *         description: OK
 * /attendances/monthly-report:
 *   get:
 *         summary: User login
 *         description: Authenticate user credentials and obtain a token.
 *         tags:
 *          - Attendance
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
 * /attendances/attendance-taken-groups:
 *   get:
 *         summary: User login
 *         description: Authenticate user credentials and obtain a token.
 *         tags:
 *          - Attendance
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
 *       example:
 *         date: '2024-07-02T08:58:49.437Z'
 *         attendance:
 *           - studentId: '66811304d73f83b6ff8658c3'
 *             status: 'P'
 *           - studentId: '666c63e743433e1dfa54b3fa'
 *             status: 'P'
 */
