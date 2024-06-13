import { Schema } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

export const studentSchema = new Schema(
  {
    fullName: {
      type: String,
      required: [true, "fullName field is required"],
      lowercase: true,
    },
    email: {
      type: String,
      unique: true,
      required: [true, "email field is required"],
      lowercase: true,
    },
    phoneNumber: {
      type: String,
      required: [true, "phoneNumber field is required"],
    },
  },
  {
    timestamps: true,
  }
);

studentSchema.plugin(mongoosePaginate);

export default studentSchema;
