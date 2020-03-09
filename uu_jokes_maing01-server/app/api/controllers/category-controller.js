"use strict";
const CategoryAbl = require("../../abl/category-abl.js");

class CategoryController {

  create(ucEnv) {
    return CategoryAbl.create(ucEnv.getUri().getAwid(), ucEnv.getDtoIn());
  }

}

module.exports = new CategoryController();
