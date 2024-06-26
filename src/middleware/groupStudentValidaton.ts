import { NextFunction, Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { Group } from "../Schema/model";

const groupStudentValidation = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    let group = await Group.findById(req.params.id);
    if (!group) {
      throw new Error("Group not Found.");
    }

    const students =
      typeof req.body.students === "string"
        ? req.body.students.split(",")
        : req.body.students;
    for (let newStudent of students) {
      if (group.students.includes(newStudent)) {
        res.status(400).json({
          message: `Student ${newStudent} already exists in the group.`,
        });
        return;
      }
    }
    next();
  }
);

export default groupStudentValidation;
