import { Router } from "express";
import { multipleFileController, singleFileController } from "./fileController";
import upload from "./utils/uploadFile";
import multer from "multer";
import fs from "fs";

let chkFol=(req:any,res:any,next:any)=>{
    let location = `public/${(req.query.location as string) || false}`;

    if (fs.existsSync(location)  ||   !req.params.location) {
      next()       
      } else {
       res.json({succes:false,msg:'folder doent exist'})
        // cb(new Error(jsonError), false);
      }

}


let file = Router();
file.route("/single").post(chkFol,upload.single("document"), singleFileController);

file.route("/multiple").post(chkFol,upload.array("document"), multipleFileController);





export default file;
