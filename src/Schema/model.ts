import { model } from "mongoose";
import studentSchema from "./studentSchema";
import { userSchema } from "./userSchema";

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
