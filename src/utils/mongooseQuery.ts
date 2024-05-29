import { Request } from "express";

export const myMongooseQuerys = (queryParams: Request["query"]) => {
  let { page, limit, sort, select, query, ...find } = queryParams;
  select = select ? `${select},-_id,-password` : "-_id,-password";
  return {
    page: Number(page) || 1,
    limit: Number(limit) || 10,
    sort: String(sort || "-createdAt").replaceAll(",", " "),
    select: String(select).replaceAll(",", " "),
    query: String(query || ""),
    find: find || {},
  };
};
