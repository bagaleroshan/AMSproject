import { Schema } from "mongoose";

export interface IinfoObj {
  _id: any;
  iat: number;
  exp: number;
}
export interface IuserData {
  fullName?: string;
  email?: string;
  password?: string;
  role?: string;
  phoneNumber?: string;
}
export interface IgroupData {
  teacher?: string;
}

export interface ILookup {
  from: string;
  localField: string;
  foreignField: string;
  as: string;
}

export interface IAttendance {
  studentId: string;
  status: string;
}
export interface IUAttendance {
  attendenceId: string;
  status: string;
}
export interface IData {
  date: string;
  attendance: IAttendance[];
}
export interface IGroup extends Document {
  subject: typeof Schema.ObjectId;
  teacher: typeof Schema.ObjectId;
  groupName: string;
  students: string[];
  active: boolean;
  startTime: string;
  endTime: string;
}
