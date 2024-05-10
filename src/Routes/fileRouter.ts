import { Router } from "express";
import {
  multipleFileController,
  singleFileController,
} from "../controllers/fileController";
import chkFol from "../utils/chkfun";
import upload from "../utils/uploadFile";

let file = Router();
file
  .route("/single")
  .post(chkFol, upload.single("document"), singleFileController);

file
  .route("/multiple")
  .post(chkFol, upload.array("document"), multipleFileController);


file.delete('/delete/:fileName').delete()

export default file;
