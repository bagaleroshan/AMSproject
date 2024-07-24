import { Schema } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

export const userSchema = new Schema(
  {
    fullName: {
      type: String,
      required: [true, "fullName field is required"],
      trim: true,
      lowercase: true,
    },
    email: {
      type: String,
      unique: true,
      required: [true, "email field is required"],
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: [true, "password field is required"],
      trim: true,
    },
    phoneNumber: {
      type: String,
      required: [true, "phoneNumber field is required"],
      trim: true,
    },
    role: {
      type: String,
      required: [true, "role field is required"],
      lowercase: true,
    },
    isPasswordChanged: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.plugin(mongoosePaginate);

export default userSchema;
