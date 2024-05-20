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
import { AuthenticatedRequest } from "../middleware/isAuthenticated";
import { userInfo } from "os";

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
      result
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
  async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    let userId = req._id;
    let result = await User.findById(userId);
    successResponseData(res, "Profile read successfully", 200, result);
  }
);

export const updateProfile = asyncHandler(
  async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    let userId = req._id;
    let data = req.body;
    delete data.email;
    delete data.password;
    delete data.role;

    let result = await User.findByIdAndUpdate(userId, data, {
      new: true,
    });
    successResponseData(res, "Profile updated successfully", 201, result);
  }
);

export const updatePassword = asyncHandler(
  async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    let userId = req._id;
    let oldPassword = req.body.oldPassword;
    let newPassword = req.body.newPassword;
    let data = await User.findById(userId);
    let dbPassword = data.password;
    let isValidPassword = await bcrypt.compare(oldPassword, dbPassword);
    if (isValidPassword) {
      let newHashPassword = await bcrypt.hash(newPassword, 10);

      let result = await User.findByIdAndUpdate(
        userId,
        {
          password: newHashPassword,
        },
        {
          new: true,
        }
      );
      successResponseData(res, "Password updated successfully", 200, result);
    }
  }
);

export const forgotPassword = asyncHandler(
  async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    let email = req.body.email;
    let result = await User.findOne({ email: email });
    if (result !== null) {
      let infoObj = {
        _id: result._id,
      };
      let expiryInfo = {
        expiresIn: "1d",
      };
      let token = await jwt.sign(infoObj, secretKey, expiryInfo);

      await sendEmail({
        from: "jenishona",
        to: email,
        subject: "Forgot Password",
        html: `
        <h4>Please verify that its you trying to reset your password.</h4><br/>
        <a href="${clientUrl}/admin/reset-password?token=${token}">
        ${clientUrl}/reset-password?token=${token}
        </a><br/>
        <h4>If you did not do this don't do anything.</h4><br/>
        `,
        attachments,
      });
      successResponseData(
        res,
        "Password reset link has been sent to your email.",
        201,
        result
      );
    }
  }
);

export const resetPassword = asyncHandler(
  async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    let hashPassword = await bcrypt.hash(req.body.password, 10);
    let result = await User.findByIdAndUpdate(
      req._id,
      {
        password: hashPassword,
      },
      {
        new: true,
      }
    );
    successResponseData(res, "Password reset successfully", 201, result);
  }
);

export const readAllUserController = asyncHandler(
  async (req: Request, res: Response) => {
    const { page, limit, sort, select, find } = myMongooseQuerys(req.query);
    let result = await readAllUserService(page, limit, sort, select, find);
    successResponseData(res, "Successfully Read All User", 200, result);
  }
);

export const readSpecificUserController = asyncHandler(
  async (req: Request, res: Response) => {
    let result = await readSpecificUserService(req.params.id);
    successResponseData(res, "Read Successfully", 200, result);
  }
);

export const updateUserController = asyncHandler(
  async (req: Request, res: Response) => {
    let result = await updateUserService(req.params.id, req.body);
    successResponseData(res, "Successfully Updated", 201, result);
  }
);
export const deleteUserController = asyncHandler(
  async (req: Request, res: Response) => {
    let result = await deleteUserService(req.params.id);
    successResponseData(res, "Successfully Deleted", 200, result);
  }
);
