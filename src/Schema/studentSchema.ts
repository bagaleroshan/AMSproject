import { Schema, model } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

export const studentSchema = new Schema(
  {
    fullName: {
      type: String,
      required: [true, "fullName field is required"],
    },
    email: {
      type: String,
      required: [true, "email field is required"],
    },

    course: {
      type: String,
      required: [true, "course field is required"],
    },
    phoneNumber: {
      type: Number,
      required: [true, "phoneNumber field is required"],
    },
  },
  {
    timestamps: true,
  }
);

studentSchema.plugin(mongoosePaginate);
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
