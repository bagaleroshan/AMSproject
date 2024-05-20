import { Schema } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

export const userSchema = new Schema(
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
    phoneNumber: {
      type: String,
      required: [true, "phoneNumber field is required"],
    },
    role: {
      type: String,
      required: [true, "role field is required"],
      // enum: ["admin", "teacher"],
    },
  },
  {
    timestamps: true,
  }
);

userSchema.plugin(mongoosePaginate);

export default userSchema;
