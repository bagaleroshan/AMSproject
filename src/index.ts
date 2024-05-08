import express, { json, Express, Request, Response } from "express";
import { port } from "./utils/constant";
import { connectToMongo } from "./connectDb/connectToMongo";
import cors from "cors";
import { studentRouter } from "./Routes/studentRouter";

const app: Express = express();
connectToMongo();
app.use(cors());
app.use(json());

app.use("/students", studentRouter);

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
