import { Request, Response } from "express";

export let singleFileController = async (req: Request, res: Response) => {
  try {
    let dir: any = req.file?.destination.split("/");
    console.log('error in uploading')
    
    if (req.file && dir[1] != "public") {
      let link = `http://localhost:8000/${dir[1]}/${req.file.filename}`;
      res.json({
        success: true,
        result: link,
        message: "file uploaded succesfully",
      });
    } else if (req.file) {
      let link = `http://localhost:8000/${req.file.filename}`;
      res.json({
        success: true,
        result: link,
        message: "files uploaded succesfully",
      });
    } else {
      console.log('error in uploading')
      res.json({
        success: false,
        message: req.body.error,
      });
    }
  } catch (error) {
    res.status(400).json({ message: (error as Error).message });
  }
};
export let multipleFileController = async (req: any, res: Response) => {
  // any
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
          let dir: any = req.file?.destination.split("/");
          console.log(val.destination.split("/"));
          return `http://localhost:8000/${val.destination.split("/")[1]}/${
            val.filename
          }`;
        }
      );
      if (link.length === 0) {
        throw new Error("file not supported");
        //res.status(400).json({ result: "file not supported" });
      } else res.status(200).json({ files: link, result: "files uploaded" });
    }
  } catch (error) {
    res.status(400).json({ success: false, message: (error as Error).message });
  }
};
