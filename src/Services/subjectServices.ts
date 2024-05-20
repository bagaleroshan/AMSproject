import { Subject } from "../Schema/model";

export const createSubjectService = async (data: {}) => {
  return await Subject.create(data);
};

export const readAllSubjectService = async (
  page: number,
  limit: number,
  sort: string,
  select: string,

  query: string,
  find: {}
) => {
  const options = {
    page,
    limit,
    sort,
    select,
  };
  let matchStage = { $match: find };
  if (query) {
    matchStage = {
      $match: {
        ...find,
        combinedData: { $regex: query, $options: "i" }, // Case-insensitive search
      },
    };
  }
  const aggregationPipeline = [
    {
      $project: {
        combinedData: {
          $concat: [
            "$subjectName",
            " ",
            "$subjectCode",
            " ",
            { $toString: "$numberOfClasses" },
          ],
        },
        subjectName: 1,
        subjectCode: 1,
        numberOfClasses: 1,
      },
    },
    matchStage,
    {
      $project: {
        combinedData: 0,
      },
    },
  ];

  const matchedDocs = await Subject.aggregate(aggregationPipeline).exec();
  const totalMatchedDocs = matchedDocs.length;

  const paginatedResult = await Subject.aggregate(aggregationPipeline)
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

export let readSpecificSubjectService = async (id: string) => {
  return await Subject.findById(id);
};

export let updateSubjectService = async (id: string, data: {}) => {
  return await Subject.findByIdAndUpdate(id, data, { new: true });
};

export let deleteSubjectService = async (id: string) => {
  return await Subject.findByIdAndDelete(id);
};
