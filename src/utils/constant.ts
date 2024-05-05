import {config} from "dotenv"

config()

export const port =process.env.PORT || 8000
export const dbUrl:any = process.env.DB_URL