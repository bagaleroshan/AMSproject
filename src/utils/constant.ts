import { config } from "dotenv";

config();

export const port = process.env.PORT;
export const dbUrl = process.env.DB_URL;
export const mailUser: string = process.env.MAIL_USER || 'jenishona123@gmail.com'
export const mailPass: string  = process.env.MAIL_PASS || "misd oait jhwa vmxd"
export const mailProvider: string = process.env.MAIL_PROVIDER || "Jenis Hona"
