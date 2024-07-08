import { Router } from "express";
import {
  multipleFileController,
  singleFileController,
} from "../Controllers/fileController";
import chkFol from "../utils/chkfun";
import { fileHandleDelete } from "../utils/deleteFile1";
import upload from "../utils/uploadFile";

let file = Router();
file
  .route("/single")
  .post(chkFol, upload.single("document"), singleFileController);

file
  .route("/multiple")
  .post(chkFol, upload.array("document"), multipleFileController);

file.route("/:fileName").delete(fileHandleDelete);

export default file;

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
