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
  present: boolean;
}
export interface IUAttendance {
  attendenceId: string;
  present: boolean;
}
export interface IData {
  date: string;
  attendance: IAttendance[];
}
