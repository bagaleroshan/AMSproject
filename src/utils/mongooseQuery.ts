import { Request } from "express";

export const myMongooseQuerys = (query: Request["query"]) => {
  let { page, limit, sort, select, ...find } = query;

  return {
    page: Number(page) || 1,
    limit: Number(limit) || 10,
    sort: String(sort || "-createdAt").replaceAll(",", " "),
    select: String(select || "").replaceAll(",", " "),
    find: find || {},
  };
};
