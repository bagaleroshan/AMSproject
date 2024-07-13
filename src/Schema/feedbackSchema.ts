import { Schema } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

export const feedbackSchema = new Schema(
  {
    onTime: {
      type: Number,
      required: [true, "onTime field is required"],
    },
    hasDeliveryPower: {
      type: Number,
      required: [true, "hasDeliveredPower field is required"],
    },
    hasSkills: {
      type: Number,
      required: [true, "hasSkills field is required"],
    },
    hasInteraction: {
      type: Number,
      required: [true, "hasInteraction field is required"],
    },

    isClassFruitful: {
      type: Number,
      required: [true, "isClassFruitful field is required"],
    },
    isClassRoomComfortable: {
      type: Number,
      required: [true, "isClassRoomComfort field is required"],
    },
    hasClearConversation: {
      type: Number,
      required: [true, "hasClearConversation field is required"],
    },
    doesInternetWork: {
      type: Number,
      required: [true, "doesInternetWork field is required"],
    },
    feelChangeOnYourself: {
      type: Number,
      required: [true, "feelChangeOnYourself field is required"],
    },
    description: {
      type: String,
      required: [true, "description is required"],
    },
    student: {
      type: Schema.ObjectId,
      ref: "Student",
    },
    group: {
      type: Schema.ObjectId,
      ref: "Group",
    },
  },
  {
    timestamps: true,
  }
);

feedbackSchema.plugin(mongoosePaginate);

export default feedbackSchema;
