"use strict";
const Path = require("path");
const { Validator } = require("uu_appg01_server").Validation;
const { DaoFactory } = require("uu_appg01_server").ObjectStore;
const { ValidationHelper } = require("uu_appg01_server").AppServer;
const Errors = require("../api/errors/category-error.js");

const WARNINGS = {
  createCategory: {
    code: `${Errors.CreateCategory.UC_CODE}unsupportedKeys`
  },
  // updateCategory: {
  //   code: `${Errors.UpdateCategory.UC_CODE}unsupportedKeys`
  // },
  // deleteCategory: {
  //   code: `${Errors.DeleteCategory.UC_CODE}unsupportedKeys`
  // },
  // listCategories: {
  //   code: `${Errors.ListCategories.UC_CODE}unsupportedKeys`
  // }
};

class CategoryAbl {

  constructor() {
    this.validator = new Validator(Path.join(__dirname, "..", "api", "validation_types", "category-types.js"));
    this.dao = DaoFactory.getDao("category");
  }

  async create(awid, dtoIn) {
    let validationResult = this.validator.validate("createCategoryDtoInType", dtoIn);
    // A2
    let uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      WARNINGS.createCategory.code,
      Errors.CreateCategory.InvalidDtoIn
    );
    let dtoOut;

    dtoIn.awid = awid;

    try {
      //HDS 2
      dtoOut = await this.dao.create(dtoIn);
    } catch (e) {
      // A3
      if (e.code === "uu-app-objectstore/duplicateKey") {
        throw new Errors.CreateCategory.CategoryNameNotUnique({ uuAppErrorMap }, { name: dtoIn.name }, e);
      }
      // A4
      if (e instanceof ObjectStoreError) {
        throw new Errors.CreateCategory.CategoryDaoCreateFailed({ uuAppErrorMap }, e);
      }
      throw e;
    }

    // HDS 3
    dtoOut.uuAppErrorMap = uuAppErrorMap;

    return dtoOut;
  }

}

module.exports = new CategoryAbl();
