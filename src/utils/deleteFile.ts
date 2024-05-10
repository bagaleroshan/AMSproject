import fs from 'fs';
import { Request, Response } from 'express';
import path from 'path';

// Assuming you have already configured Multer and it's handling file uploads

export function handleFileUpload(req: any, res: Response) {


    const filenameToDelete = req.params.fileName;

  // Construct the full path to the file within your static folder
  const filePath = path.join(__dirname, './public', filenameToDelete);
  // Assuming you're dealing with a single file upload

  // Delete the file using fs.unlink
  fs.unlink(filePath, (err) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Failed to dealete the file');
    }
    console.log('File deleted successfully');
    // Handle any other logic, e.g., send a response
    res.send('File deleted successfully');
  });
}