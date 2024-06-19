import { Types } from "mongoose";
const { ObjectId } = Types;

export const toObjectId = (id: string | Types.ObjectId): Types.ObjectId => {
  if (typeof id === "string" && ObjectId.isValid(id)) {
    return new ObjectId(id);
  }
  throw new Error(`Invalid ObjectId: ${id}`);
};
