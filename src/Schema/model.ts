import { model } from "mongoose";
import studentSchema from "./studentSchema";
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


export const Subject = model<iSubject>("Subject", subjectSchema);
