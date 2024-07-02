import { mailProvider, mailUser } from "../utils/constant";
import {
  attachments,
  htmlContent,
  sendEmail,
  subject
} from "../utils/sendMail";
import { generateToken1 } from "./generateToken";
export let emailSender = async (email: string) => {
  await sendEmail({
    from: `${mailProvider} <${mailUser}>`,
    to: [email],
    subject: subject,
    html: htmlContent,
    attachments: attachments,
  });
};
export let emailSender1 = async (std: {email:string,id:string}, groupId:string) => {

   const token=generateToken1({studentId:std.id,groupId:groupId})
  
  await sendEmail({
    from: `${mailProvider} <${mailUser}>`,
    to: [std.email],
    subject: subject,
    html: `
    <html>
        <head>
        </head>
        <body>
            <h1>Please follow the link below to fill feedback credentials</h1>
            <a href="http://localhost:5173/feedback-form?token=${token}" >Click Here For Feedback.</a> </body>
    </html>
`,
    attachments: attachments,
  });
};
