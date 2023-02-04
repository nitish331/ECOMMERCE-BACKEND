class ApiFeatures {
  constructor(query, querystr) {
    this.query = query;
    this.querystr = querystr;
  }

  search() {
    const keyword = this.querystr.keyword
      ? {
          name: {
            $regex: this.querystr.keyword,
            $options: "i",
          },
        }
      : {};

    this.query = this.query.find({ ...keyword });
    return this;
  }

  filter() {
    const queryCopy = { ...this.querystr };
    // remove some fields from category
    const removeFeilds = ["keyword", "page", "limit"];

    removeFeilds.forEach((key) => delete queryCopy[key]);

    // filter for price and ratings
    let queryStr = JSON.stringify(queryCopy);
    queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, (key) => `$${key}`);
    this.query = this.query.find(JSON.parse(queryStr));

    return this;
  }

  pagination(perPageResult) {
    const currentPage = Number(this.querystr.page) || 1;

    const skip = perPageResult * (currentPage - 1);

    this.query = this.query.limit(perPageResult).skip(skip);

    return this;
  }
}

module.exports = ApiFeatures;
