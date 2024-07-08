import { Router } from "express";
import {
  addStudentGroupController,
  createGroupController,
  deleteGroupController,
  readAllGroupController,
  readRelatedGroupController,
  readSpecificGroupController,
  updateGroupController,
} from "../Controllers/groupController";
import isAuthenticated from "../middleware/isAuthenticated";
import isAuthorized from "../middleware/isAuthorized";

export const groupRouter = Router();

groupRouter
  .route("/")
  .post(
    isAuthenticated,
    isAuthorized(["admin", "superAdmin"]),
    createGroupController
  );

groupRouter
  .route("/")
  .get(
    isAuthenticated,
    isAuthorized(["admin", "superAdmin"]),
    readAllGroupController
  );

groupRouter
  .route("/addStudent/:id")
  .patch(
    //isAuthenticated,
  //  isAuthorized(["admin", "superAdmin"]),
    addStudentGroupController
  );

groupRouter.route("/teacher").get(isAuthenticated, readRelatedGroupController);
groupRouter
  .route("/:id")
  .get(
    isAuthenticated,
    isAuthorized(["teacher", "admin", "superAdmin"]),
    readSpecificGroupController
  )
  .patch(
    isAuthenticated,
    isAuthorized(["admin", "superAdmin"]),
    updateGroupController
  )
  .delete(
    isAuthenticated,
    isAuthorized(["admin", "superAdmin"]),
    deleteGroupController
  );

  /**
 * @swagger
 * components:
 *        securitySchemes:
 *          bearerAuth:
 *           type: http
 *           scheme: bearer
 *           bearerFormat: JWT
 * /groups:
 *   get:
 *     summary: Retrieve groups
 *     description: Retrieves a list of groups records with pagination support. Can be filtered by groupId or studentId.
 *     security:
 *       - bearerAuth: []     
 *     responses:
 *       '200':
 *         description: A list of attendance records
 *     tags:
 *       - Groups
 *   post:
 *     summary: Create a new user 
 *     description: Create a new user with the specified data.
 *     tags:
 *        - Groups
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Group'
 * 
 * /groups/{id}:
 *   get:
 *     summary: Retrieve paginated group records
 *     description: Retrieves a list of group records with pagination support. Can be filtered by groupId or studentId.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *     security:
 *       - bearerAuth: []     
 *     responses:
 *       '200':
 *         description: A list of group records
 *     tags:
 *       - Groups
 *   
 *   patch:
 *     summary: Update a  group 
 *     description: Update a  group with the specified data.
 *     tags:
 *        - Groups
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Group'
 *     responses:
 *       200:
 *         description: OK
 *   delete:
 *     summary: Delete a  user 
 *     description: Delete a  user 
 *     tags:
 *        - Groups
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Group'
 *     responses:
 *       200:
 *         description: OK
 * /groups/addStudent:
 *   post:
 *         summary: add std in a groups
 *         description: add students in group
 *         tags:
 *          - Groups
 *         requestBody:
 *          required: true
 *          content:
 *            application/json:
 *              schema:
 *               type: object
 *         responses:
 *               '200':
 *                description: Login successful. Returns a token.
 
 *

 *    

 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Group:
 *       type: object
 *       properties:
 *         subject:
 *           type: string
 *           description: Full name of the user
 *         teacher:
 *           type: string
 *           format: email
 *           description: Email address of the user
 *         groupName:
 *           type: string
 *           format: password
 *           description: Password of the user
 *         students:
 *           type: string
 *           description: Phone number of the user
 *         active:
 *           type: string
 *           description: Role of the user (e.g., admin, user)
 *         startTime:
 *           type: boolean
 *           default: false
 *           description: Flag indicating if the password has been changed by the user
 *         endTime:
 *           type: boolean
 *           default: false
 *           description: Flag indicating if the password has been changed by the user
 *       example:
 *         subject: ''
 *         teacher: ''
 *         groupName: ''
 *         students: ['','']
 *         active: ''
 *         startTime: false
 *         endTime: ''
 */
