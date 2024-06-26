import { secretKey } from "./constant";
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
