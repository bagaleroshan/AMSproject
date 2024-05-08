import { error } from "console";
import { Request } from "express";
import multer from "multer";
import path from "path";
import cheerio from 'cheerio';

const fs = require("fs");
let LocErr: Boolean = false;

let limits = {
  fileSize: 1024 * 1024 * 2,
};

let storage = multer.diskStorage({
  destination: (
    req: Request,
    file: {
      fieldname: string;
      originalname: string;
      encoding: string;
      mimetype: string;
    },
    cb: any
  ) => {
    let location = `public/${(req.query.location as string) || false}`;
    //let staticFolder = "./public";
    console.log(fs.existsSync(location));

    if (!req.query.location) {
      location = "./public";
    }

    if (!location) {
      return cb(new Error("folderName is required"));
    }
    console.log(location);
    const uploadPath = path.join(__dirname, "uploads", location);
    if (fs.existsSync(location)) {
      LocErr = false;
      cb(null, location);
    } else {
      console.log('file error')
      LocErr = true;
      // cb(new Error(jsonError), false);
    }
  },

  filename: (
    req: Request,
    file: {
      fieldname: string;
      originalname: string;
      encoding: string;
      mimetype: string;
    },
    cb: any
  ) => {
    let fileName = Date.now() + file.originalname;
    cb(null, fileName);
  },
});

let fileFilter = (
  req: Request,
  file: {
    fieldname: string;
    originalname: string;
    encoding: string;
    mimetype: string;
  },
  cb: any
) => {
  let validExtensions = [
    ".jpeg",
    ".jpg",
    ".JPG",
    ".JPEG",
    ".png",
    ".svg",
    ".PNG",
    ".doc",
    ".pdf",
    ".mp4",
  ];
  if (req.query.validExtensions === "image")
    validExtensions = [
      ".jpeg",
      ".jpg",
      ".JPG",
      ".JPEG",
      ".png",
      ".svg",
      ".PNG",
    ];
  else if (req.query.validExtensions === "docs")
    validExtensions = [".doc", ".pdf", ".mp4"];
  else {
    validExtensions = String(req.query.validExtensions).split(",");
  }

  let originalName = file.originalname;
  let originalExtension = path.extname(originalName);
  let isValidExtension = validExtensions.includes(originalExtension);

  console.log(LocErr)
  if (isValidExtension && LocErr === false) {
    try {
      cb(null, true);
    } catch (error) {}
  } else {
    cb(null, false);
  }
  LocErr = false;
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: limits,
});







export default upload;


