import { Schema, model } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

export const teacherSchema = new Schema(
  {
    fullName: {
      type: String,
      required: [true, "fullName field is required"],
    },
    email: {
      type: String,
      unique: true,
      required: [true, "email field is required"],
    },

    password: {
      type: String,
      required: [true, "password field is required"],
    },
    role: {
      type: String,
      required: [true, "role field is required"],
    },
  },
  {
    timestamps: true,
  }
);

teacherSchema.plugin(mongoosePaginate);

export default teacherSchema;
