import { Schema } from "mongoose";

export const subjectSchema :Schema = new Schema({
    subjectName:{
        type:String,
        required:[true,"Name is Required"]
    },
    subjectCode: {
        type:String,
        required:[true,"Subject Code is Required"],
        lowercase:true,
        unique:true
        
    },
    numberOfClasses:{
        type:Number,
        required:[true,"Number of Classes is required"]
    }
})

