import fs from 'fs';
import { Request, Response } from 'express';
import path from 'path';

// Assuming you have already configured Multer and it's handling file uploads

export function handleFileUpload(req: any, res: Response) {


    const filenameToDelete = req.query.fileName;
    let actualLocation

    (filenameToDelete.split('/').length==3)? actualLocation=filenameToDelete.split('/')[filenameToDelete.split('/').length-2]+'/'+filenameToDelete.split('/')[filenameToDelete.split('/').length-1]:actualLocation=filenameToDelete.split('/')[filenameToDelete.split('/').length-1]
    
  // Construct the full path to the file within your static folder
  const filePath = path.join( './public/', actualLocation);
  console.log(actualLocation)
  // Assuming you're dealing with a single file upload

  // Delete the file using fs.unlink
  fs.unlink(filePath, (err) => {
    if (err) {
      console.error(err);
      return res.status(400).json({success:false,message:'file undeleted successfully'});
    }
    console.log('File deleted successfully');
    // Handle any other logic, e.g., send a response
    res.status(200).json({success:true,message:'File deleted successfully'});
  });
}