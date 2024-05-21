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

  const aggregationPipeline = [
    {
      $project: projection,
    },
    matchStage,
  ];

  const matchedDocs = await Model.aggregate(aggregationPipeline).exec();
  const totalMatchedDocs = matchedDocs.length;

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
