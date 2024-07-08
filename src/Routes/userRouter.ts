import { Router } from "express";
import {
  createUserController,
  deleteUserController,
  forgotPassword,
  loginUserController,
  myProfile,
  readAllUserController,
  readSpecificUserController,
  resetPassword,
  updatePassword,
  updateProfile,
  updateUserController,
} from "../Controllers/userController";
import isAuthenticated from "../middleware/isAuthenticated";
import isAuthorized from "../middleware/isAuthorized";
import { validation } from "../middleware/validation";
import { userValidation } from "../validation/userValidation";

export const userRouter = Router();

userRouter
  .route("/")
  .post(
    isAuthenticated,
    isAuthorized(["admin", "superAdmin"]),
    validation(userValidation({ isCreate: true })),
    createUserController
  );

userRouter.route("/login").post(loginUserController);
userRouter.route("/my-profile").get(isAuthenticated, myProfile);
userRouter
  .route("/update-profile")
  .patch(
    isAuthenticated,
    validation(userValidation({ isCreate: false })),
    updateProfile
  );
userRouter.route("/update-password").patch(isAuthenticated, updatePassword);
userRouter.route("/forgot-password").post(forgotPassword);
userRouter.route("/reset-password").patch(isAuthenticated, resetPassword);
userRouter
  .route("/")
  .get(
    isAuthenticated,
    isAuthorized(["admin", "superAdmin"]),
    readAllUserController
  );
userRouter
  .route("/:id")
  .get(
    isAuthenticated,
    isAuthorized(["admin", "superAdmin"]),
    readSpecificUserController
  )
  .patch(
    isAuthenticated,
    isAuthorized(["admin", "superAdmin"]),
    updateUserController
  )
  .delete(
    isAuthenticated,
    isAuthorized(["admin", "superAdmin"]),
    deleteUserController
  );



  /**
 * @swagger
 * components:
 *        securitySchemes:
 *          bearerAuth:
 *           type: http
 *           scheme: bearer
 *           bearerFormat: JWT
 * /users/update-password:
 *   patch:
 *     summary: update password for a user 
 *     description: Create a new user with the specified data.
 *     tags:
 *        - Users
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserUpdatePassword'
 * /users/reset-password:
 *   patch:
 *     summary: Create a new user 
 *     description: Create a new user with the specified data.
 *     tags:
 *        - Users
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 * /users/forgot-password:
 *   post:
 *     summary: Create a new user 
 *     description: Create a new user with the specified data.
 *     tags:
 *        - Users
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ForgotUser'
 * /users:
 *   get:
 *     summary: Retrieve paginated attendance records
 *     description: Retrieves a list of attendance records with pagination support. Can be filtered by groupId or studentId.
 *     security:
 *       - bearerAuth: []     
 *     responses:
 *       '200':
 *         description: A list of attendance records
 *     tags:
 *       - Users
 *   post:
 *     summary: Create a new user 
 *     description: Create a new user with the specified data.
 *     tags:
 *        - Users
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *   patch:
 *     summary: Update a  user 
 *     description: Update a  user with the specified data.
 *     tags:
 *        - Users
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
 *        - Users
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
 *       - Users
 *   
 *   patch:
 *     summary: Update a  user 
 *     description: Update a  user with the specified data.
 *     tags:
 *        - Users
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
 *        - Users
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
 *          - Users
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