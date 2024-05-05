import { config } from "dotenv";

config();

export const port = process.env.PORT || 8000;
export const dbUrl = process.env.DB_URL;
