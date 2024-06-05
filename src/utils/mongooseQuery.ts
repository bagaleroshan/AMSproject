import { Request } from "express";

export const myMongooseQuerys = (queryParams: Request["query"]) => {
  let { page, limit, sort, select, query, ...find } = queryParams;
  select = select ? `${select},-_id,-password` : "-_id,-password";
  let limitNumber = Number(limit);
  if (limitNumber === 0) {
    limitNumber = Number.MAX_SAFE_INTEGER * 100;
  } else {
    limitNumber = limitNumber > 0 ? limitNumber : 10;
  }
  return {
    page: Number(page) || 1,
    limit: Number(limitNumber) || 10,
    sort: String(sort || "-createdAt").replaceAll(",", " "),
    select: String(select).replaceAll(",", " "),
    query: String(query || ""),
    find: find || {},
  };
};
