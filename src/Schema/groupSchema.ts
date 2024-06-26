import { Schema } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";
import { IGroup } from "../utils/interfaces";

const startTimeValidator = function (this: IGroup, startTime: string): boolean {
  return startTime < this.endTime;
};
const groupSchema: Schema = new Schema(
  {
    subject: {
      required: [true, "subject is Required"],
      type: Schema.ObjectId,
      ref: "Subject",
    },
    teacher: {
      required: [true, "teacher is Required"],
      type: Schema.ObjectId,
      ref: "User",
    },
    groupName: {
      type: String,
      required: [true, "groupName is required"],
      unique: true,
    },
    students: [
      {
        type: Schema.ObjectId,
        ref: "Student",
      },
    ],
    active: {
      type: Boolean,
      default: true,
    },
    startTime: {
      type: String,
      required: true,
      validate: [
        {
          validator: startTimeValidator,
          message: "Start time must be before end time",
        },
      ],
    },
    endTime: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

groupSchema.plugin(mongoosePaginate);
export default groupSchema;
