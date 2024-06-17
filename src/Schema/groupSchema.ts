import { Schema } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

interface IGroup extends Document {
  subject: Schema.Types.ObjectId;
  teacher: Schema.Types.ObjectId;
  groupName: string;
  students: string[];
  active: boolean;
  startTime: string;
  endTime: string;
}

const startTimeValidator = function (this: IGroup, startTime: string): boolean {
  return startTime < this.endTime;
};

const groupSchema: Schema = new Schema(
  {
    subject: {
      required: [true, "subject is Required"],
      type: Schema.Types.ObjectId,
      ref: "Subject",
    },
    teacher: {
      required: [true, "teacher is Required"],
      type: Schema.Types.ObjectId,
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
      default: false,
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
