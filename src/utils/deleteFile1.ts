import fs from "fs";
import path from "path";

const uploadDirectories = ["public", "public/product", "public/docs"];
// Route to handle deleting uploaded files
export const fileHandleDelete = (req: any, res: any, next: any) => {
  const filename = req.params.fileName;
  // Iterate through each directory to find the file
  let fileFound = false;
  for (const dir of uploadDirectories) {
    const filePath = path.join(dir, filename);
    // Check if the file exists in this directory
    if (fs.existsSync(filePath)) {
      // Delete the file
      fs.unlink(filePath, (err) => {
        if (err) {
          return res
            .status(500)
            .json({ success: false, message: "Internal Server Error" });
        }
      });
      fileFound = true;
      break; // Exit the loop if the file is found and deleted
    }
  }
  if (!fileFound) {
    return res.status(404).json({ success: false, message: "File not found" });
  }
  res.json({ success: true, message: "File deleted successfully" });
};
