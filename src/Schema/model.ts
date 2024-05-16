import { model } from "mongoose";
import studentSchema from "./studentSchema";
import { userSchema } from "./userSchema";
import { subjectSchema } from "./subjectSchema";
interface iSubject extends Document {
  subjectName: string;
  subjectCode: string;
  numberOfClasses: number;
}

export const Student: any = model<
  typeof Student & {
    paginate: (
      filter: any,
      options: any,
      callback?: (err: any, result: any) => void
    ) => Promise<any>;
  }
>("Student", studentSchema);

export const User: any = model<
  typeof User & {
    paginate: (
      filter: any,
      options: any,
      callback?: (err: any, result: any) => void
    ) => Promise<any>;
  }
>("User", userSchema);

export const Subject = model<iSubject>("Subject", subjectSchema);
