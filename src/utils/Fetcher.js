export class ApiFetcher {
  constructor(mongooseQuery, searchQuery) {
    this.mongooseQuery = mongooseQuery;
    this.searchQuery = searchQuery;
  }
  pagination() {
    if (this.searchQuery.page <= 0) this.searchQuery.page = 1;
    if (this.searchQuery.pagelimit <= 0) this.searchQuery.pagelimit = 25;
    let pageNumber = this.searchQuery.page * 1 || 1;
    let pageLimit = this.searchQuery.pagelimit * 1 || 25;
    let skip = (pageNumber - 1) * pageLimit;
    this.mongooseQuery.skip(skip).limit(pageLimit);
    this.pageNumber = pageNumber;
    this.pageLimit = pageLimit;
    this.metadata = {
      page: pageNumber,
      pageLimit: pageLimit,
    };
    return this;
  }
  filter() {
    if (this.searchQuery.filter) {
      let filterObject = { ...this.searchQuery.filter };
      filterObject = JSON.stringify(filterObject);
      filterObject = filterObject.replace(
        /(gt|gte|lt|lte)/g,
        (match) => "$" + match
      );
      filterObject = JSON.parse(filterObject);
      this.mongooseQuery.find(filterObject);
    }
    return this;
  }
  sort() {
    if (this.searchQuery.sort) {
      let sortBy = this.searchQuery.sort.split(",").join(" ");
      this.mongooseQuery.sort(sortBy);
    }
    return this;
  }
  select() {
    if (this.searchQuery.fields) {
      let fields = this.searchQuery.fields.split(",").join(" ");
      this.mongooseQuery.select(fields);
    }
    return this;
  }
  search() {
    if (this.searchQuery.keyword) {
      let query = Object.keys(this.searchQuery.keyword);

      this.mongooseQuery.find({
        [query]: {
          $regex: this.searchQuery.keyword[query].trim(),
          $options: "i", // begins a case-insensitive match.
        },
      });
    }
    return this;
  }
}
