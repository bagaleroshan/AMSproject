import { Router } from "express";
import { multipleFileController, singleFileController } from "./fileController";
import upload from "./utils/uploadFile";
let file = Router();
file.route("/single").post(upload.single("document"), singleFileController);

file.route("/multiple").post(upload.array("document"), multipleFileController);

export default file;
