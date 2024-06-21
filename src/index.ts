import cors from "cors";
import express, { Express, Request, Response } from "express";
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
import { attendanceRouter } from "./Routes/attendanceRouter";
import exceljs from 'exceljs';
import { carRouter } from "./Routes/carRouter";

const jsonData = [
  {Name: "John", "Age": 30, "City": "New York"},
  {"Name": "Alice", "Age": 25, "City": "Los Angeles"},
  {"Name": "Bob", "Age": 35, City: "Chicago"}
];

const app: Express = express();
connectToMongo();
app.use(cors());
app.use(express.static(staticFolder));
app.use(express.json());

const swaggerDocument = YAML.load(path.join("./public", "swag.yaml"));

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Define your routes here
app.use("/students", studentRouter);
app.use("/users", userRouter);
app.use("/subjects", subjectRouter);
app.use("/groups", groupRouter);
app.use("/attendances", attendanceRouter);
app.use("/cars", carRouter);

app.get('/convert', (req: Request, res: Response) => {
  // Create a new workbook
  const workbook = new exceljs.Workbook();
  const worksheet = workbook.addWorksheet('Sheet1');

  // Add header row
  const headerRow = worksheet.addRow(["Name", "Age", "City"]);

  // Make header row bold
  headerRow.font = { bold: true };

  // Add data rows
  jsonData.forEach((data) => {
      worksheet.addRow([data.Name, data.Age, data.City]);
  });

  // Generate XLSX file
  workbook.xlsx.writeBuffer()
      .then(buffer => {
          res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
          res.setHeader('Content-Disposition', 'attachment; filename="data.xlsx"');
          res.send(buffer);
      })
      .catch(error => {
          console.error('Error generating XLSX:', error);
          res.status(500).send('Error generating XLSX');
      });
});

app.use(errorHandler);

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
