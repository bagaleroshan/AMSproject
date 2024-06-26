import Joi from "joi";
import { studentRouter } from "../Routes/studentRouter";

export const feedbackValidation = Joi.object()
  .keys({
    onTime: Joi.number()
    .custom((value,msg:any)=>{
        if(value<=5){
            return true
        }else{
            return msg.message("Rank between 1 to 5 only")
        }
    })
    .required(),
    hasDeliveredPower: Joi.number()
    .custom((value,msg:any)=>{
        if(value<=5){
            return true
        }else{
            return msg.message("Rank between 1 to 5 only")
        }
    })
    .required(),
    hasSkills: Joi.number()
    .custom((value,msg:any)=>{
        if(value<=5){
            return true
        }else{
            return msg.message("Rank between 1 to 5 only")
        }
    })
    .required(),
    hasInteraction: Joi.number()
    .custom((value,msg:any)=>{
        if(value<=5){
            return true
        }else{
            return msg.message("Rank between 1 to 5 only")
        }
    })
    .required(),
    isClassFretful: Joi.number()
    .custom((value,msg:any)=>{
        if(value<=5){
            return true
        }else{
            return msg.message("Rank between 1 to 5 only")
        }
    })
    .required(),
    isClassRoomComfort: Joi.number()
    .custom((value,msg:any)=>{
        if(value<=5){
            return true
        }else{
            return msg.message("Rank between 1 to 5 only")
        }
    })
    .required(),
    hasClearConversation: Joi.number()
    .custom((value,msg:any)=>{
        if(value<=5){
            return true
        }else{
            return msg.message("Rank between 1 to 5 only")
        }
    })
    .required(),
    doesInternetWork: Joi.number()
    .custom((value,msg:any)=>{
        if(value<=5){
            return true
        }else{
            return msg.message("Rank between 1 to 5 only")
        }
    })
    .required(),
    feelChangeOnYourself: Joi.number()
    .custom((value,msg:any)=>{
        if(value<=5){
            return true
        }else{
            return msg.message("Rank between 1 to 5 only")
        }
    })
    .required(),
    student:Joi.string(),
    group:Joi.string(),
    
  })
  .unknown(false);
