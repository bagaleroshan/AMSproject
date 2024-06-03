import { NextFunction, Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { Group } from "../Schema/model";

const groupStudentValidation = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    let group = await Group.findById(req.params.id);
    let arrayOfStd = req.body.students.split(",");
    for (let j = 0; j < arrayOfStd.length; j++) {
      for (let i = 0; i < group.students.length; i++) {
        if ((arrayOfStd[j] as string) == (group.students[i] as string)) {
          let error = new Error("Student already exists.");
          console.log(error);
          throw error;
        }
      }
    }
    next();
  }
);

export default groupStudentValidation;
