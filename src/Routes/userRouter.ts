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
import { validation } from "../middleware/validation";
import { userValidation } from "../validation/userValidation";
import isAuthenticated from "../middleware/isAuthenticated";
import isAuthorized from "../middleware/isAuthorized";

export const userRouter = Router();

userRouter.route("/").post(validation(userValidation), createUserController);

userRouter.route("/login").post(loginUserController);
userRouter.route("/my-profile").get(isAuthenticated, myProfile);
userRouter.route("/update-profile").patch(isAuthenticated, updateProfile);
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
