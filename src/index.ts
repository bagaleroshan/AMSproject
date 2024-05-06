import express, { json, Express, Request, Response } from "express";
import { port } from "./utils/constant";
import { connectToMongo } from "./connectDb/connectToMongo";
import cors from "cors";
import file from "./fileRouter";

const app: Express = express();
connectToMongo();
app.use(cors());
app.use(express.static("./public"))
app.use(json());

app.use("/file",file)

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Backend Server");
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
