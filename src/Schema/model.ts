import { model } from "mongoose";
import studentSchema from "./studentSchema";
import { userSchema } from "./userSchema";
import subjectSchema from "./subjectSchema";
import groupSchema from "./groupSchema";
import attendanceSchema from "./attendanceSchema";
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

export const Subject: any = model<
  typeof Subject & {
    paginate: (
      filter: any,
      options: any,
      callback?: (err: any, result: any) => void
    ) => Promise<any>;
  }
>("Subject", subjectSchema);

export const Group: any = model<
  typeof Group & {
    paginate: (
      filter: any,
      options: any,
      callback?: (err: any, result: any) => void
    ) => Promise<any>;
  }
>("Group", groupSchema);
export const Attendance: any = model<
  typeof Attendance & {
    paginate: (
      filter: any,
      options: any,
      callback?: (err: any, result: any) => void
    ) => Promise<any>;
  }
>("Attendance", attendanceSchema);

// export const Subject = model<iSubject>("Subject", subjectSchema);
