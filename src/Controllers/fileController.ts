import { Request, Response } from "express";

export let singleFileController = async (req: Request, res: Response) => {
  try {
    let link = "";
    if (req.file && req.query.location) {
      link = `http://localhost:8000/${req.query.location}/${req.file.filename}`;
      res.json({
        success: true,
        result: link,
        message: "File uploaded succesfully.",
      });
    } else if (req.file) {
      link = `http://localhost:8000/${req.file.filename}`;
      res.json({
        success: true,
        result: link,
        message: "File uploaded succesfully.",
      });
    } else {
      res.json({
        success: false,

        message: "Unsuccessfull.",
      });
    }
  } catch (error) {
    res.status(400).json({ message: (error as Error).message });
  }
};
export let multipleFileController = async (req: any, res: Response) => {
  try {
    if (req.files) {
      let link = req.files.map(
        (
          val: {
            filename: string;
            fieldname: string;
            originalname: string;
            encoding: string;
            mimetype: string;
            destination: string;
            path: string;
            size: number;
          },
          i: Number
        ) => {
          if (req.query.location)
            return `http://localhost:8000/${req.query.location}/${val.filename}`;
          else return `http://localhost:8000/${val.filename}`;
        }
      );

      if (link.length === 0) {
        throw new Error("file not supported.");
      } else
        res.status(200).json({
          success: true,
          result: link,
          message: "Files uploaded successfully.",
          filesNotUploaded: req.body.error ? req.body.error : "",
        });
    }
  } catch (error) {
    res.status(400).json({ success: false, message: (error as Error).message });
  }
};
