import nodemailer from "nodemailer";
import { mailPass, mailUser } from "./constant";
import path from "path";

let transporterInfo = {
  host: "smtp.gmail.com",
  port: 587,
  secure: false,

  auth: {
    // user: "jenishona123@gmail.com",
    // pass: "misd oait jhwa vmxd",
    user: `${mailUser}`,
    pass: `${mailPass}`,
  },
};
interface iAttachment {
  fileName: string;
  path: string;
  cid?: string;
}

export let sendEmail = async (mailInfo: {
  from: string;
  to: string[];
  subject: string;
  html: string;
  attachments: iAttachment[];
}) => {
  try {
    let transporter = nodemailer.createTransport(transporterInfo);
    let info = await transporter.sendMail(mailInfo);
  } catch (error) {
    console.log("error has occurred", (error as Error).message);
  }
};

export const htmlContent: string = `
    <html>
        <head>
            <style>
               table {
               border-collapse: collapse;
                width: 100%;
    }
              th, td {
              border: 1px solid black;
              padding: 8px;
             text-align: left;
             vertical-align: top; /* Align content to the top of cells */
             white-space: nowrap; /* Prevent wrapping of long content */
             overflow: hidden; /* Hide content that exceeds cell dimensions */
             text-overflow: ellipsis; /* Show ellipsis (...) for overflow */
    }
            th {
                  background-color: #f2f2f2;
    }   
                 .image-container {
                 border: 2px solid #000;
                 padding: 20px;
                 position:relative
                 }
                 .image-container img{
                   position: absolute;
                   top: 0;
                   left: 0;
                 }
            </style>
        </head>
        <body>
            <h1>Attendance Sheet</h1>
            <p></p>
            <table>
                <thead>
        <tr>
            <th>Course</th>
            <th>Number Of absentees</th>
            <th>Present No.</th>
            <th>Classes Completed</th>
            <th>Absentees</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>Mern</td>
            <td>0</td>
            <td>10</td>
            <td>5/55</td>
            <td>No record</td>
        </tr>
        <tr>
            <td>Python</td>
            <td>4</td>
            <td>6</td>
            <td>10/55</td>
            <td>Sanjog,Roshan,Ram,Laxman</td>
        </tr>
        <tr>
            <td>Machine Learning With Python</td>
            <td>10</td>
            <td>0</td>
            <td>50/55</td>
            <td>Sanjog,Roshan,Ram,Laxman,Sanjog,Roshan,Ram,Laxman,Jenis,Shambhu</td>
        </tr>
                </tbody>
            </table>
            <img src="cid:unique_image_cid" width= "100" height = "100">
        </body>
    </html>
`;
export let imagePath = path.resolve(
  __dirname,
  "../../public/image/logoOnly.png"
);
export let docPath = path.resolve(__dirname, "../../public/docs/intro.pdf");

export let attachments: iAttachment[] = [
  {
    fileName: "logoOnly.png",
    path: imagePath,
    cid: "unique_image_cid",
  },
  {
    fileName: "intro.pdf",
    path: docPath,
  },
];

export let subject: string = "Welcome to AMS";
