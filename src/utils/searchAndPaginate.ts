export const searchAndPaginate = async (
  Model: any,
  page: number,
  limit: number,
  sort: string,
  select: string,
  query: string,
  find: {},
  fields: string[]
) => {
  const aggregationPipeline = [];
  let projection: { [key: string]: any } = {};
  if (fields && Array.isArray(fields)) {
    fields.forEach((field) => {
      projection[field] = 1;
    });
  }

  let matchStage = { $match: find };
  if (query) {
    matchStage = {
      $match: {
        ...find,
        $or: fields.map((field) => ({
          [field]: { $regex: query, $options: "i" },
        })),
      },
    };
  }
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

  if (sort) {
    const sortFields: { [key: string]: number } = sort
      .split(" ")
      .reduce((acc, field) => {
        const [key, order] = field.split(":");
        acc[key] = order === "desc" ? -1 : 1;
        return acc;
      }, {} as { [key: string]: number });
    aggregationPipeline.push({ $sort: sortFields });
  }

  const countPipeline = [...aggregationPipeline, { $count: "count" }];
  const matchedDocs = await Model.aggregate(countPipeline).exec();
  const totalMatchedDocs = matchedDocs[0]?.count || 0; // Handle case when matchedDocs is undefined

  const paginatedResult = await Model.aggregate(aggregationPipeline)
    .sort(sort)
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
