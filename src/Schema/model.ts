import { model } from "mongoose";
import studentSchema from "./studentSchema";

const Student: any = model<
  typeof Student & {
    paginate: (
      filter: any,
      options: any,
      callback?: (err: any, result: any) => void
    ) => Promise<any>;
  }
>("Student", studentSchema);
export default Student;
