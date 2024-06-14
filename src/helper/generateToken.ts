import { secretKey } from "../utils/constant";
import jwt from "jsonwebtoken";

export const generateToken = (result: { _id: string }) => {
  let infoObj = {
    _id: result._id,
  };
  let expiryInfo = {
    expiresIn: "5d",
  };
  let token = jwt.sign(infoObj, secretKey, expiryInfo);
  return token;
};
