import { group } from "console";
import { secretKey } from "../utils/constant";
import jwt from "jsonwebtoken";

export const generateToken = (result: { _id: string }) => {
  let infoObj = {
    _id: result._id,
  };
  let expiryInfo = {
    expiresIn: "100y",
  };
  let token = jwt.sign(infoObj, secretKey, expiryInfo);
  return token;
};
export const generateToken1 = (result: { studentId: string,groupId:string }) => {
  let infoObj = {
    studentId: result.studentId,groupId:result.groupId
  };
  let expiryInfo = {
    expiresIn: "100y",
  };
  let token = jwt.sign(infoObj, secretKey, expiryInfo);
  return token;
};
