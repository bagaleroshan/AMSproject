import { Router } from "express";

import {
  createUserController,
  deleteUserController,
  loginUserController,
  myProfile,
  readAllUserController,
  readSpecificUserController,
  updateUserController,
} from "../Controllers/userController";
import { validation } from "../middleware/validation";
import { userValidation } from "../validation/userValidation";

export const userRouter = Router();

userRouter
  .route("/")
  .post(validation(userValidation), createUserController)
  .get(readAllUserController);

userRouter.route("/login").post(loginUserController);
userRouter.route("/my-profile").get(myProfile);

userRouter
  .route("/:id")
  .get(readSpecificUserController)
  .patch(updateUserController)
  .delete(deleteUserController);
