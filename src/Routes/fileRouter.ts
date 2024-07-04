import { Router } from "express";
import {
  multipleFileController,
  singleFileController,
} from "../Controllers/fileController";
import chkFol from "../utils/chkfun";
import { fileHandleDelete } from "../utils/deleteFile1";
import upload from "../utils/uploadFile";

let file = Router();
file
  .route("/single")
  .post(chkFol, upload.single("document"), singleFileController);

file
  .route("/multiple")
  .post(chkFol, upload.array("document"), multipleFileController);

file.route("/:fileName").delete(fileHandleDelete);

export default file;
