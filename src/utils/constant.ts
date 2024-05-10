import { config } from "dotenv";

config();

export const port = process.env.PORT || 8000;
export const dbUrl = process.env.DB_URL || "mongodb://0.0.0.0:27017/ams";
export const mailUser: string =
  process.env.MAIL_USER || "jenishona123@gmail.com";
export const mailPass: string = process.env.MAIL_PASS || "misd oait jhwa vmxd";
export const mailProvider: string = process.env.MAIL_PROVIDER || "Jenis Hona";
export const staticFolder: string = process.env.STATIC_FOLDER || "./public";
export const validExtensions: string[] = [
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
