import cors from "cors";
import express, { Express, json } from "express";
import file from "./Routes/fileRouter";
import { studentRouter } from "./Routes/studentRouter";
import { subjectRouter } from "./Routes/subjectRouter";
import { connectToMongo } from "./connectDb/connectToMongo";
import { port, staticFolder } from "./utils/constant";
import { userRouter } from "./Routes/userRouter";
import { errorHandler } from "./utils/errorHandler";
import swaggerUi from "swagger-ui-express";
import * as YAML from "yamljs";
import path from "path";
import { groupRouter } from "./Routes/groupRouter";

const app: Express = express();
connectToMongo();
app.use(cors());
app.use(express.static(staticFolder));
app.use(json());

const swaggerDocument = YAML.load(path.join("./public", "YAML.yaml"));

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use("/file", file);

app.use("/students", studentRouter);

app.use("/users", userRouter);
app.use("/subjects", subjectRouter);
app.use("/groups", groupRouter);

app.use(errorHandler);



app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});




