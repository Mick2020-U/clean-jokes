"use strict";

const JokesMainUseCaseError = require("./jokes-main-use-case-error.js");
const CATEGORY_ERROR_PREFIX = `${JokesMainUseCaseError.ERROR_PREFIX}category/`;
const UuJokesError = require("./uu-jokes-error");

const CreateCategory = {
  UC_CODE: `${UuJokesError.ERROR_PREFIX}createCategory/`,
  InvalidDtoIn: class extends UuJokesError {
    constructor() {
      super(...arguments);
      this.code = `${CreateCategory.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  },
  CategoryNameNotUnique: class extends UuJokesError {
    constructor() {
      super(...arguments);
      this.code = `${CreateCategory.UC_CODE}categoryNameNotUnique`;
      this.message = "Category name is not unique in awid.";
    }
  },
  CategoryDaoCreateFailed: class extends UuJokesError {
    constructor() {
      super(...arguments);
      this.code = `${CreateCategory.UC_CODE}categoryDaoCreateFailed`;
      this.message = "Create category by category Dao create failed.";
    }
  }
};

module.exports = {
  CreateCategory
};
