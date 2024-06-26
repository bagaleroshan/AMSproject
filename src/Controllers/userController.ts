import bcrypt from "bcrypt";
import { NextFunction, Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { User } from "../Schema/model";
import {
  createUserService,
  deleteUserService,
  readAllUserService,
  readSpecificUserService,
  updateUserService,
} from "../Services/userService";
import { AuthenticatedRequest } from "../middleware/isAuthenticated";
import {
  clientUrl,
  defaultPassword,
  mailProvider,
  mailUser,
} from "../utils/constant";
import { generateToken } from "../utils/generateToken";
import { myMongooseQuerys } from "../utils/mongooseQuery";
import { attachments, sendEmail } from "../utils/sendMail";
import successResponseData from "../utils/successResponse";
import {
  generateCreateEmailHtml,
  generateResetPasswordHtml,
} from "../utils/htmlContentFormat";

export const createUserController = asyncHandler(
  async (req: AuthenticatedRequest, res: Response) => {
    let password = await bcrypt.hash(defaultPassword as string, 10);
    let data = { ...req.body, password };
    let result = await createUserService(data);
    const emailHtml = generateCreateEmailHtml(
      defaultPassword as string,
      clientUrl
    );
    await sendEmail({
      from: `${mailProvider} <${mailUser}>`,
      to: [req.body.email],
      subject: "Account Registration.",
      html: emailHtml,
      attachments: attachments,
    });
    successResponseData(
      res,
      "Registration Successful. Please check your email for login.",
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
        let token = await generateToken(result);
        successResponseData(res, "Logged in Successfully.", 200, result, token);
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
    successResponseData(res, "Profile read successfully.", 200, result);
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
    successResponseData(res, "Profile updated successfully.", 201, result);
  }
);

export const updatePassword = asyncHandler(
  async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    let userId = req._id;
    let data = await User.findById(userId);
    let isValidPassword = await bcrypt.compare(
      req.body.oldPassword,
      data.password
    );
    if (isValidPassword) {
      let isPasswordSame = await bcrypt.compare(
        req.body.newPassword,
        data.password
      );
      if (isPasswordSame) {
        let err = new Error("Old password and New password are same.");
        throw err;
      }
      let newHashPassword = await bcrypt.hash(req.body.newPassword, 10);

      let result = await User.findByIdAndUpdate(
        userId,
        {
          password: newHashPassword,
          isPasswordChanged: true,
        },
        {
          new: true,
        }
      );
      successResponseData(res, "Password updated successfully.", 200, result);
    } else {
      let error = new Error("Old Password did not match.");
      throw error;
    }
  }
);

export const forgotPassword = asyncHandler(
  async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    let email = req.body.email;
    let result = await User.findOne({ email: email });
    if (result !== null) {
      let token = await generateToken(result);
      const emailHtml = generateResetPasswordHtml(clientUrl, token);
      await sendEmail({
        from: `${mailProvider} <${mailUser}>`,
        to: email,
        subject: "Forgot Password?",
        html: emailHtml,
        attachments: attachments,
      });
      successResponseData(
        res,
        "Password reset link has been sent to your email.",
        201,
        result
      );
    } else {
      throw new Error("Email did not match with our database.");
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
    successResponseData(res, "Password reset successfully.", 201, result);
  }
);

export const readAllUserController = asyncHandler(
  async (req: Request, res: Response) => {
    const { page, limit, sort, select, query, find } = myMongooseQuerys(
      req.query
    );
    let result = await readAllUserService(
      page,
      limit,
      sort,
      select,
      query,
      find
    );
    successResponseData(res, "Successfully Read All User.", 200, result);
  }
);

export const readSpecificUserController = asyncHandler(
  async (req: Request, res: Response) => {
    let result = await readSpecificUserService(req.params.id);
    successResponseData(res, "Read Successfully.", 200, result);
  }
);

export const updateUserController = asyncHandler(
  async (req: Request, res: Response) => {
    let result = await updateUserService(req.params.id, req.body);
    successResponseData(res, "Successfully Updated.", 201, result);
  }
);
export const deleteUserController = asyncHandler(
  async (req: AuthenticatedRequest, res: Response) => {
    let result = await deleteUserService(req.params.id, req._id as string);
    successResponseData(res, "Successfully Deleted.", 200, result);
  }
);
