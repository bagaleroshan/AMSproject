import { ILookup } from "./interfaces";

export const searchAndPaginate = async (
  Model: any,
  page: number,
  limit: number,
  sort: string,
  select: string,
  query: string,
  find: {},
  fields: { field: string; type: string }[],
  lookups: ILookup[] = []
) => {
  const aggregationPipeline = [];
  let projection: { [key: string]: any } = {};

  fields.forEach(({ field }) => {
    projection[field] = 1;
  });

  let matchStage = { $match: find };
  if (query) {
    matchStage = {
      $match: {
        ...find,
        $or: fields.map(({ field, type }) => ({
          [field]:
            type === "string"
              ? { $regex: query, $options: "i" }
              : Number(query),
        })),
      },
    };
  }

  console.log("aggregation", matchStage);
  aggregationPipeline.push(matchStage);

  if (select) {
    const selectFields: { [key: string]: number } = select
      .split(" ")
      .reduce((acc, field) => {
        if (field.startsWith("-")) {
          acc[field.substring(1)] = 0;
        } else {
          acc[field] = 1;
        }
        return acc;
      }, {} as { [key: string]: number });

    aggregationPipeline.push({ $project: selectFields });
  } else if (Object.keys(projection).length > 0) {
    aggregationPipeline.push({ $project: projection });
  }

  if (lookups.length > 0) {
    lookups.forEach((lookup) => {
      aggregationPipeline.push(
        {
          $lookup: {
            from: lookup.from,
            localField: lookup.localField,
            foreignField: lookup.foreignField,
            as: lookup.as,
          },
        },
        {
          $unwind: {
            path: `$${lookup.as}`,
            preserveNullAndEmptyArrays: true,
          },
        }
      );
    });
  }

  if (sort) {
    const sortFields: { [key: string]: number } = sort
      .split(",")
      .reduce((acc, field) => {
        if (field.startsWith("-")) {
          acc[field.substring(1)] = -1;
        } else {
          acc[field] = 1;
        }
        return acc;
      }, {} as { [key: string]: number });
    aggregationPipeline.push({ $sort: sortFields });
  }
  const countPipeline = [...aggregationPipeline, { $count: "count" }];
  const matchedDocs = await Model.aggregate(countPipeline).exec();
  const totalMatchedDocs = matchedDocs[0]?.count || 0;

  const paginatedResult = await Model.aggregate(aggregationPipeline)
    .skip((page - 1) * limit)
    .limit(limit)
    .exec();

  const totalPages = Math.ceil(totalMatchedDocs / limit);
  const hasPrevPage = page > 1;
  const hasNextPage = page < totalPages;

  const data = {
    results: paginatedResult,
    totalDataInAPage: paginatedResult.length,
    totalDataInWholePage: totalMatchedDocs,
    currentPage: page,
    totalPages: totalPages,
    hasPreviousPage: hasPrevPage,
    hasNextPage: hasNextPage,
  };

  return data;
};
