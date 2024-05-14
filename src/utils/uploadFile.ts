import { Request } from "express";
import multer from "multer";
import path from "path";
import { staticFolder, validExtensions } from "./constant";

let limits = {
  fileSize: 1024 * 1024 * 2,
};

let storage = multer.diskStorage({
  destination: (req: Request, _file, cb: any) => {
    
    const location = req.query.location
      ? `${staticFolder}/${req.query.location}`
      : `${staticFolder}`;

    cb(null, location);
  },

  filename: (_req, file, cb: any) => {
    let fileName = Date.now() + file.originalname;
    cb(null, fileName);
  },
});

let fileFilter = (req: Request, file: any, cb: any) => {
  let validExt = [];
  if (req.query.validExtension) {
    validExt = String(req.query.validExtension).split(",");
  } else {
    validExt = [...validExtensions];
  }

  let originalName = file.originalname;
  let originalExtension = path.extname(originalName); //note path module is inbuilt module(package) of node js (ie no need to install path package)
  let isValidExtension = validExt.includes(originalExtension);

  if (isValidExtension) {
    cb(null, true);
    //true =>it means  pass such type of file
    //note null represent error since there is no error thus error is null
  } else {
    req.body.error += originalName + " file not supported  ";
    cb(null, false);

    //false means don't pass such type of file
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: limits,
});

export default upload;
