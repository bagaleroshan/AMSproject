import mongoose, {  Document, Schema } from "mongoose";

const subjectSchema :Schema = new Schema({
    subjectName:{
        type:String,
        required:[true,"Name is Required"]
    },
    subjectCode: {
        type:String,
        required:[true,"Subject Code is Required"]
    },
    numberOfClasses:{
        type:Number,
        required:[true,"Number of Classes is required"]
    }
})

interface iSubject extends Document {
  subjectName: string;
  subjectCode: string;
  numberOfClasses: number;
}

export const SubjectModel = mongoose.model<iSubject>("Subject", subjectSchema);