import { model } from "mongoose";
import studentSchema from "./studentSchema";
import teacherSchema from "./teacherSchema";

export const Student: any = model<
  typeof Student & {
    paginate: (
      filter: any,
      options: any,
      callback?: (err: any, result: any) => void
    ) => Promise<any>;
  }
>("Student", studentSchema);
export const Teacher: any = model<
  typeof Teacher & {
    paginate: (
      filter: any,
      options: any,
      callback?: (err: any, result: any) => void
    ) => Promise<any>;
  }
>("Student", teacherSchema);
 
