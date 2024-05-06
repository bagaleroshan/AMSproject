import cors from "cors";
import express, { Express, Request, Response, json } from "express";
import { connectToMongo } from "./connectDb/connectToMongo";
import file from "./fileRouter";
import { port } from "./utils/constant";

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
