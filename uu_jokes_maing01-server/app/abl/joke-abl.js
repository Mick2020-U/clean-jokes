"use strict";
const Path = require("path");
const { Validator } = require("uu_appg01_server").Validation;
const { DaoFactory, ObjectStoreError } = require("uu_appg01_server").ObjectStore;
const { ValidationHelper } = require("uu_appg01_server").AppServer;
const Errors = require("../api/errors/joke-error.js");

const AUTHORITIES_PROFILE = "Authorities";

const WARNINGS = {
  createJoke: {
    unsupportedKeys: {
      code: `${Errors.CreateJoke.UC_CODE}unsupportedKeys`,
      message: "DtoIn contains unsupported keys."
    }
  },
  jokeList: {
    unsupportedKeys: {
      code: `${Errors.JokesList.UC_CODE}unsupportedKeys`,
      message: "DtoIn contains unsupported keys."
    }
  },
  updateJoke: {
    unsupportedKeys: {
      code: `${Errors.UpdateJoke.UC_CODE}unsupportedKeys`,
      message: "DtoIn contains unsupported keys."
    },
    jokeDoesNotExist: {
      code: `${Errors.UpdateJoke.UC_CODE}jokeDoesNotExist`,
      message: "Joke does not exist."
    }
  },
  deleteJoke: {
    unsupportedKeys: {
      code: `${Errors.DeleteJoke.UC_CODE}unsupportedKeys`,
      message: "DtoIn contains unsupported keys."
    }
  },
};

class JokeAbl {

  constructor() {
    this.validator = new Validator(Path.join(__dirname, "..", "api", "validation_types", "joke-types.js"));
    this.dao = DaoFactory.getDao("joke");
  }

  async list(awid, dtoIn) {
    let validationResult = this.validator.validate("jokeListDtoInType", dtoIn);

    let uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      WARNINGS.jokeList.unsupportedKeys.code,
      Errors.JokesList.InvalidDtoIn
    );
    let sort = dtoIn.hasOwnProperty("sortBy") ? (dtoIn.sortBy === "name" ? "name" : "rating") : "name";
    let order = dtoIn.hasOwnProperty("order") ? (dtoIn.order === "asc" ? 1 : -1) : 1;
    let dtoOut = {};

    dtoIn.pageInfo = dtoIn.pageInfo || { pageIndex: 0, pageSize: 100 };
    dtoIn.pageInfo.pageSize = dtoIn.pageInfo.pageSize || 100;

    try {
      dtoOut = await this.dao.list(awid, dtoIn.pageInfo, sort, order);
    } catch (e) {

      if (e instanceof ObjectStoreError) {
        throw new Errors.JokesList.JokeDaoListFailed({ uuAppErrorMap }, e);
      }
      throw e;
    }

    dtoOut.uuAppErrorMap = uuAppErrorMap;
    return dtoOut;
  }

  async create(awid, dtoIn, authorizationResult, session) {
    let validationResult = this.validator.validate("createJokeDtoInType", dtoIn);

    let uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      WARNINGS.createJoke.unsupportedKeys.code,
      Errors.CreateJoke.InvalidDtoIn
    );
    dtoIn.awid = awid;
    dtoIn.visibility = authorizationResult.getAuthorizedProfiles().includes(AUTHORITIES_PROFILE);
    // dtoIn.uuIdentity = session.getIdentity().getUuIdentity();
    // dtoIn.uuIdentityName = session.getIdentity().getName();
    let dtoOut;
    try {
      dtoOut = await this.dao.create(dtoIn);
    } catch (e) {
      if (e instanceof ObjectStoreError) {
        throw new Errors.CreateJoke.JokeDaoCreateFailed({ uuAppErrorMap }, e);
      }
      throw e;
    }
    dtoOut.uuAppErrorMap = uuAppErrorMap;
    return dtoOut;
  }

  async update(awid, dtoIn, authorizationResult) {
    let validationResult = this.validator.validate("updateJokeDtoInType", dtoIn);

    let uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      WARNINGS.updateJoke.unsupportedKeys.code,
      Errors.UpdateJoke.InvalidDtoIn
    );
    let dtoOut = {};

      try {
        let foundJoke = await this.dao.get(awid, dtoIn.id);

        if (!foundJoke) {
          ValidationHelper.addWarning(
            uuAppErrorMap,
            WARNINGS.updateJoke.jokeDoesNotExist.code,
            WARNINGS.updateJoke.jokeDoesNotExist.message,
            {
              jokeId: dtoIn.id
            }
          );
        }
      } catch (e) {
        if (e instanceof ObjectStoreError) {
          throw new Errors.UpdateJoke.JokeDaoGetFailed({ uuAppErrorMap }, e);
        }
        throw e;
      }
      try {
        // dtoIn.awid = awid;

        dtoOut = await this.dao.update({...dtoIn, awid});
      } catch (e) {

        if (e instanceof ObjectStoreError) {
          throw new Errors.UpdateJoke.JokeDaoUpdateFailed({ uuAppErrorMap }, e);
        }
        throw e;
    }
    // dtoOut.uuAppErrorMap = uuAppErrorMap;
    return {...dtoOut, uuAppErrorMap};
  }

  async delete(awid, dtoIn) {
    let validationResult = this.validator.validate("deleteJokeDtoInType", dtoIn);

    let uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      WARNINGS.deleteJoke.unsupportedKeys.code,
      Errors.DeleteJoke.InvalidDtoIn
    );
    let dtoOut = {};
    try {

      await this.dao.delete(awid, dtoIn.id);
    } catch (e) {

      if (e instanceof ObjectStoreError) {
        throw new Errors.DeleteJoke.JokeDaoDeleteFailed({ uuAppErrorMap }, e);
      }
      throw e;
    }

    dtoOut.uuAppErrorMap = uuAppErrorMap;

    return dtoOut;
  }

}

module.exports = new JokeAbl();
