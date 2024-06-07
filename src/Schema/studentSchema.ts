import { Schema } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

export const studentSchema = new Schema(
  {
    fullName: {
      type: String,
      required: [true, "fullName field is required"],
      trim: true,
    },
    email: {
      type: String,
      unique: true,
      required: [true, "email field is required"],
      trim: true,
    },
    // attentance: [
    //   {
    //     date: String,
    //     isPresent: Boolean,
    //   },
    // ],
    phoneNumber: {
      type: String,
      required: [true, "phoneNumber field is required"],
      trim: true,
    },
    
  },
  {
    timestamps: true,
  }
);

studentSchema.plugin(mongoosePaginate);

export default studentSchema;
