import { Request, Response } from "express";
import { createSubjectService, readAllSubjectService, readSpecificSubjectService, updateSubjectService } from "../Services/subjectServices";
import { deleteStudentService } from "../Services/studentService";

export const createSubjectController = async (req: Request, res: Response) => {
  try {
    let result = await createSubjectService(req.body);
    res.status(200).json({
      success: true,
      message: "Subject Created Successfully",
      result: result,
    });
    
  } catch (error) {
    res.status(400).json({
      success: false,
      message: `Failed to create subject: ${error as Error} `,
    });
  }
};

export const readAllSubjectController = async(req: Request, res: Response)=>{
    try{
        let result = await readAllSubjectService()
        res.status(200).json({
            success:true,
            message:"Read Successfully",
            result: result
        })
    }
    catch(error){
        res.status(400).json({
            success:false,
            message:(error as Error).message
        })
    }
}


export const readSpecificSubjectController = async(req:Request,res:Response)=>{
   try {
       let result = await readSpecificSubjectService(req.params.id);
       res.status(200).json({
        success:true,
        message:"Read Successfully",
        result:result
       })
   } catch (error) {
    res.status(400).json({success:false,message:"Cannot find the ID:  "+(error as Error).message})
    
   }
}
 
export const updateSubjectController = async(req:Request,res:Response)=>{
    
      try {
         let result = await updateSubjectService(req.params.id, req.body);
         res.status(200).json({
            success:true,
            message:"Successfully Updated",
            result:result
         })
      } catch (error) {
           res.status(400).json({
             success: false,
             message: "Cannot  Updated"+(error as Error).message,
           });  
      }
      
     
}

export const deleteSubjectController = async (req: Request, res: Response) => {
  try {
    let result = await deleteStudentService(req.params.id);
      res.status(200).json({
        success:true,
        message:"Delete successful"
      })
  } catch (error) {
    res.status(404).json({
      success: false,
      message: "Id not found",
    });
  }
};
