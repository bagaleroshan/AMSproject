import { Schema } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

let studentSchema = new Schema({
  fullName: {
    type: String,
    required: [true, "fullName field is required"],
  },
  email: {
    type: String,
    required: [true, "email field is required"],
  },

  course: {
    type: String,
    required: [true, "course field is required"],
  },
  phoneNumber: {
    type: Number,
    required: [true, "phoneNumber field is required"],
  },
});

studentSchema.plugin(mongoosePaginate);

export default studentSchema;
