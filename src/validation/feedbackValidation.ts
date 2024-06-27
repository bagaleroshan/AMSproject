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
    hasDeliveryPower: Joi.number()
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
    isClassRoomComfortable: Joi.number()
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
    description:Joi.string().required(),
    student:Joi.string(),
    group:Joi.string(),
    
  })
  .unknown(false);
