import bcrypt from "bcrypt";
import { NextFunction, Request, Response } from "express";
import asyncHandler from "express-async-handler";
import {
  createUserService,
  deleteUserService,
  readAllUserService,
  readSpecificUserService,
  updateUserService,
} from "../Services/userService";
import successResponseData from "../helper/successResponse";
import {
  clientUrl,
  mailProvider,
  mailUser,
  secretKey,
} from "../utils/constant";
import { myMongooseQuerys } from "../utils/mongooseQuery";
import { attachments, sendEmail } from "../utils/sendMail";
import { User } from "../Schema/model";
import jwt from "jsonwebtoken";

export const createUserController = asyncHandler(
  async (req: Request, res: Response) => {
    let defaultPassword: string = "Password@123";
    let password = await bcrypt.hash(defaultPassword, 10);
    let data = { ...req.body, password };
    let result = await createUserService(data);
    await sendEmail({
      from: `${mailProvider} <${mailUser}>`,
      to: [req.body.email],
      subject: "Account Registration",
      html: `
      <h1>Your account has been created successfully</h1>
      <p>Your password is: ${defaultPassword}</p>
      <a href="${clientUrl}/login">
      Login
      </a>
      <br />
      <br />
      <br />
      <img src="cid:unique_image_cid" width= "100" height = "100">

      `,
      attachments: attachments,
    });
    successResponseData(
      res,
      "Successfully created User and Verification email has been sent.",
      201,
      result,
      ""
    );
  }
);

export let loginUserController = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    let email = req.body.email;
    let password = req.body.password;
    let result = await User.findOne({ email: email });
    if (result) {
      let dbPassword = result.password;
      let isValidPassword = await bcrypt.compare(password, dbPassword);
      if (isValidPassword === true) {
        let infoObj = {
          _id: result._id,
        };
        let expiryInfo = {
          expiresIn: "1d",
        };
        let token = await jwt.sign(infoObj, secretKey, expiryInfo);
        successResponseData(res, "Logged in Successfully", 200, result, token);
      } else {
        let error = new Error("Email or Password did not match.");
        throw error;
      }
    } else {
      let error = new Error("Email or Password did not match.");
      throw error;
    }
  }
);

export const myProfile = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    let tokenString = req.headers.authorization || "";
    let token = tokenString.split(" ")[1];
    let user: any = await jwt.verify(token, secretKey);
    let userId = user._id;
    let result = await User.findById(userId);
    successResponseData(res, "Profile read successfully", 200, result, "");
  }
);

export const readAllUserController = asyncHandler(
  async (req: Request, res: Response) => {
    const { page, limit, sort, select, find } = myMongooseQuerys(req.query);
    let result = await readAllUserService(page, limit, sort, select, find);
    successResponseData(res, "Successfully Read All User", 200, result, "");
  }
);

export const readSpecificUserController = asyncHandler(
  async (req: Request, res: Response) => {
    let result = await readSpecificUserService(req.params.id);
    successResponseData(res, "Read Successfully", 200, result, "");
  }
);

export const updateUserController = asyncHandler(
  async (req: Request, res: Response) => {
    let result = await updateUserService(req.params.id, req.body);
    successResponseData(res, "Successfully Updated", 201, result, "");
  }
);
export const deleteUserController = asyncHandler(
  async (req: Request, res: Response) => {
    let result = await deleteUserService(req.params.id);
    successResponseData(res, "Successfully Deleted", 200, result, "");
  }
);
