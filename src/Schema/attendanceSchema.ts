import { Schema } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const attendanceSchema: Schema = new Schema(
  {
    date: {
      required: [true, "date is Required"],
      type: Date,
    },
    groupId: {
      required: [true, "groupId is Required"],
      type: Schema.ObjectId,
      ref: "Group",
    },
    studentId: {
      required: [true, "studentId is Required"],
      type: Schema.ObjectId,
      ref: "Student",
    },
    status: {
      type: String,
      enum: ["A", "P", "-"],
      default: "-",
    },
  },
  {
    timestamps: true,
  }
);

attendanceSchema.plugin(mongoosePaginate);
export default attendanceSchema;
