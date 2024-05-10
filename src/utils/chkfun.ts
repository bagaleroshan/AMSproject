import { NextFunction, Request, Response } from "express";
import fs from "fs";

const chkFol = (req: Request, res: Response, next: NextFunction) => {
  let location = `public/${req.query.location as string}`;

  if (req.query.location === undefined || fs.existsSync(location)) {
    next();  req.body.error=''
  } else {
    res.status(400).json({ succes: false, message: "Folder does not exist" });
  }
};
export default chkFol;
