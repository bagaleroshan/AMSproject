import { Schema } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

export const studentSchema = new Schema(
  {
    fullName: {
      type: String,
      required: [true, "fullName field is required"],
      lowercase: true,
      trim: true,
    },
    email: {
      type: String,
      unique: true,
      required: [true, "email field is required"],
      lowercase: true,
      trim: true,
    },
    phoneNumber: {
      type: String,
      required: [true, "phoneNumber field is required"],
      trim: true,
    },
    groups: [
      {
        type: Schema.ObjectId,
        ref: "Group",
      },
    ],
  },
  {
    timestamps: true,
  }
);

studentSchema.plugin(mongoosePaginate);

export default studentSchema;
