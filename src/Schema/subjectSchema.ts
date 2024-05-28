import { Schema } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const subjectSchema: Schema = new Schema(
  {
    subjectName: {
      type: String,
      required: [true, "subjectName is Required"],
      trim: true,
    },
    subjectCode: {
      type: String,
      unique: true,
      required: [true, "subjectCode is Required"],
      lowercase: true,
      trim: true,
    },
    numberOfClasses: {
      type: Number,
      required: [true, "numberOfClasses is required"],
    },
  },
  {
    timestamps: true,
  }
);

subjectSchema.plugin(mongoosePaginate);
export default subjectSchema;
