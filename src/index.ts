import cors from "cors";
import { studentRouter } from "./Routes/studentRouter";
import { errorHandler } from "./utils/errorHandler";
import express, { Express, Request, Response, json } from "express";
import { connectToMongo } from "./connectDb/connectToMongo";
import file from "./Routes/fileRouter";
import { port, staticFolder } from "./utils/constant";

const app: Express = express();
connectToMongo();
app.use(cors());
app.use(express.static(staticFolder));
app.use(json());

app.use("/file", file);

app.use("/students", studentRouter);

app.use(errorHandler);

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
