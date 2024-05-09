import { Request, Response } from "express";
import {
  createStudentService,
  deleteStudentService,
  readAllStudentService,
  readSpecificStudentService,
  updateStudentService,
} from "../Services/studentService";
import { mailProvider, mailUser } from "../utils/constant";
import {
  attachments,
  htmlContent,
  sendEmail,
  subject,
} from "../utils/sendMail";
import { myMongooseQuerys } from "../utils/mongooseQuery";

interface ISearchQuery {
  fullName?: string;
  course?: string;
}

export const createStudentController = async (req: Request, res: Response) => {
  try {
    let result = await createStudentService(req.body);
    await sendEmail({
      from: `${mailProvider} <${mailUser}>`,
      to: [req.body.email],
      subject: subject,
      html: htmlContent,
      attachments: attachments,
    });

    res.status(200).json({
      success: true,
      message:
        "Successfully created Student and email has been sent for verification",
      result: result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: (error as Error).message,
    });
  }
};

export const readAllStudentController = async (req: Request, res: Response) => {
  try {
    const { page, limit, sort, select, find } = myMongooseQuerys(req.query);
    let result = await readAllStudentService(page, limit, sort, select, find);
    res.status(200).json({
      success: true,
      message: "Student read successfully",
      result: result,
    });
  } catch (error) {
    res.status(400).json({
      success: true,
      message: (error as Error).message,
    });
  }
};

export const readSpecificStudentController = async (
  req: Request,
  res: Response
) => {
  try {
    let result = await readSpecificStudentService(req.params.id);
    res.status(200).json({
      success: true,
      message: "Successfully read a student",
      result: result,
    });
  } catch (error) {
    res.status(400).json({
      success: true,
      message: (error as Error).message,
    });
  }
};

export const updateStudentController = async (req: Request, res: Response) => {
  try {
    let result = await updateStudentService(req.params.id, req.body);
    res.status(201).json({
      success: true,
      message: "student updated successfully",
      result: result,
    });
  } catch (error) {
    res.status(400).json({
      success: true,
      message: (error as Error).message,
    });
  }
};
export const deleteStudentController = async (req: Request, res: Response) => {
  try {
    let result = await deleteStudentService(req.params.id);
    res.status(201).json({
      success: true,
      message: "student deleted successfully",
      result: result,
    });
  } catch (error) {
    res.status(400).json({
      success: true,
      message: (error as Error).message,
    });
  }
};
