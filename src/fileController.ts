import { Request, Response } from "express";

export let singleFileController = async (req: Request, res: Response) => {
  try {
    if (req.file) {
      let link = `http://localhost:8000/${req.file.filename}`;
      res.json({ success: true, result: link });
    }
  } catch (error) {
    res.status(400).json({ message: (error as Error).message });
  }
};
export let multipleFileController = async (req: any, res: Response) => {
  // any
  try {
    if (req.files) {
      console.log(req.files)
      let link = req.files.map((val: {filename:string,fieldname:string,originalname:string,encoding:string,mimetype:string,destination:string,path:string,size:number}, i: Number) => {
        return `http://localhost:8000/${val.filename}`;
      });
      if (link.length===0) {res.status(400).json({ result: 'file not supported' })}
      else res.status(200).json({files:link,result:'files uploaded'})
      
    }
  } catch (error) {
    res.status(400).json({ message: (error as Error).message });
  }
};
