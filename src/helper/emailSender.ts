import { mailProvider, mailUser } from "../utils/constant";
import {
  attachments,
  htmlContent,
  sendEmail,
  subject,
} from "../utils/sendMail";
 let emailSender = async (email: string) => {
  await sendEmail({
    from: `${mailProvider} <${mailUser}>`,
    to: [email],
    subject: subject,
    html: htmlContent,
    attachments: attachments,
  });
};
export default emailSender