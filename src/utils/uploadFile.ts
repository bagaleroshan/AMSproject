import { Request } from "express";
import multer from "multer";
import path from "path";

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

    if (!req.query.location) {
      location = "./public";
    }
    if (!location) {
      return cb(new Error("folderName is required"));
    }

    const uploadPath = path.join(__dirname, "uploads", location);
    cb(null, location);
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
    ".doc",
    ".pdf",
    ".mp4",
    ".PNG",
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

  let originalName = file.originalname;
  let originalExtension = path.extname(originalName);
  let isValidExtension = validExtensions.includes(originalExtension);

  if (isValidExtension) {
    cb(null, true);
  } else {
    cb(new Error("File is not supported"), false);
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: limits,
});

export default upload;
