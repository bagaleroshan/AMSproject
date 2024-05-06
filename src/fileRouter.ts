import { Router } from "express";
import upload from "./utils/uploadFile";
import { multipleFileController, singleFileController } from "./fileController";
let file=Router()
file  
.route('/single')
 .post(upload.single("document"),singleFileController)   // middleware
 
 file .route('/multiple')
 .post(upload.array("document"),multipleFileController)   // middleware

export default file