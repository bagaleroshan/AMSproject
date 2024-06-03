import { Schema } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const attendanceSchema: Schema = new Schema(
  {
    date: {
      required: [true, "date is Required"],
      type: String,
      unique: true,
    },
    groupId: {
      required: [true, "group is Required"],
      type: Schema.ObjectId,
      ref: "Group",
    },
    attendances: [
      {
        studentId: {
          type: Schema.ObjectId,
          ref: "Student",
        },
        status: {
          type: Boolean,
          default: false,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

attendanceSchema.plugin(mongoosePaginate);
export default attendanceSchema;
