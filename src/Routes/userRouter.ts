import { Router } from "express";

import {
  createUserController,
  loginUserController,
} from "../Controllers/userController";
import { validation } from "../middleware/validation";
import { userValidation } from "../validation/userValidation";

export const userRouter = Router();

userRouter.route("/").post(validation(userValidation), createUserController);
// .get(readAllUserController);

userRouter.route("/login").post(loginUserController);

// teacherRouter
//   .route("/:id")
//   .get(readSpecificUserController)
//   .patch(updateUserController)

//   .delete(deleteUserController);

// teacherRouter.route("/verify-email");
