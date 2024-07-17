import { clientUrl, mailProvider, mailUser } from "../utils/constant";
import { generateToken1 } from "../utils/generateToken";
import { generateFeedbackHtml } from "../utils/htmlContentFormat";
import {
  attachments,
  htmlContent,
  sendEmail,
  subject,
} from "../utils/sendMail";
export let emailSender = async (email: string) => {
  await sendEmail({
    from: `${mailProvider} <${mailUser}>`,
    to: [email],
    subject: subject,
    html: htmlContent,
    attachments: attachments,
  });
};
export let emailSender1 = async (
  std: { email: string; id: string },
  groupId: string
) => {
  const token = generateToken1({ studentId: std.id, groupId: groupId });
  const feedbackContent = generateFeedbackHtml(clientUrl, token);
  await sendEmail({
    from: `${mailProvider} <${mailUser}>`,
    to: [std.email],
    subject: subject,
    html: feedbackContent,
    attachments: attachments,
  });
};
