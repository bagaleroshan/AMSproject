import { Schema } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";
import { IGroup, IgroupData } from "../helper/interfaces";


const carSchema: Schema = new Schema(
  {
    name: {
      required: [true, "subject is Required"],
      type: String,
    },
    model: {
      required: [true, "teacher is Required"],
      type: String,
      
    },
    price: {
      type: String,
      required: [true, "groupName is required"],
    },
    quantity: 
      {
        type: String,
      },
    
    
  },
  {
    timestamps: true,
  }
);

carSchema.plugin(mongoosePaginate);
export default carSchema;
