const DEFAULT_PAGE_LIMIT = 0;
const DEFAULT_PAGE_VALUE = 1;

const getPagination = (reqQuery) => {
  const page = Math.abs(reqQuery.page) || DEFAULT_PAGE_VALUE;
  const limit = Math.abs(reqQuery.limit) || DEFAULT_PAGE_LIMIT;

  const skip = (page - 1) * limit;

  return {
    skip,
    limit,
  };
};

module.exports = {
  getPagination,
};
