import { Schema } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

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
        studentId: {
          type: Schema.ObjectId,
          ref: "Student",
        },
        // attendance: {
        //   date: {
        //     type: Date,
        //   },
        //   status: {
        //     type: Boolean,
        //   },
        // },
      },
    ],
    startTime: {
      type: String,
      required: true,
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
