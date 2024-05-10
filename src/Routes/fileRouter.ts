import { Router } from "express";
import chkFol from "../utils/chkfun";
import upload from "../utils/uploadFile";
import { multipleFileController, singleFileController } from "../Controllers/fileController";
import { handleFileUpload } from "../utils/deleteFile";


let file = Router();
file
  .route("/single")
  .post(chkFol, upload.single("document"), singleFileController);

file
  .route("/multiple")
  .post(chkFol, upload.array("document"), multipleFileController);


file.route('/delete/:fileName').delete(handleFileUpload)

export default file;
