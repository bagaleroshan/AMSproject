import { Request } from "express";

interface MongooseQueryOptions {
  page: number;
  limit: number;
  sort: string;
  find: Record<string, any>;
}

export const myMongooseQuerys = (
  query: Request["query"]
): MongooseQueryOptions => {
  let { page, limit, sort, ...find } = query;

  return {
    page: Number(page) || 1,
    limit: Number(limit) || 10,
    sort: String(sort || "-createdAt").replaceAll(",", " "),
    find: find || {},
  };
};
