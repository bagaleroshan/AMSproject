import { Schema } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const subjectSchema: Schema = new Schema({
  subjectName: {
    type: String,
    required: [true, "Name is Required"],
  },
  subjectCode: {
    type: String,
    required: [true, "Subject Code is Required"],
    lowercase: true,
  },
  numberOfClasses: {
    type: Number,
    required: [true, "Number of Classes is required"],
  },
},{
  timestamps: true,
});

subjectSchema.plugin(mongoosePaginate);
export default subjectSchema;
