"use strict";
const UuJokesError = require("./uu-jokes-error");
const JokesMainUseCaseError = require("./jokes-main-use-case-error.js");
const JOKE_ERROR_PREFIX = `${JokesMainUseCaseError.ERROR_PREFIX}joke/`;

const CreateJoke = {
  UC_CODE: `${JOKE_ERROR_PREFIX}/joke/create`,
  InvalidDtoIn: class extends UuJokesError {
    constructor() {
      super(...arguments);
      this.code = `${CreateJoke.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  },
  JokeDaoCreateFailed: class extends UuJokesError {
    constructor() {
      super(...arguments);
      this.code = `${CreateJoke.UC_CODE}jokeDaoCreateFailed`;
      this.message = "Create joke by joke Dao create failed.";
    }
  }
};

let JokesList = {
  UC_CODE: `${UuJokesError.ERROR_PREFIX}joke/list`,
  InvalidDtoIn: class extends UuJokesError {
    constructor() {
      super(...arguments);
      this.code = `${JokesList.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  },
  JokeDaoListFailed: class extends UuJokesError {
    constructor() {
      super(...arguments);
      this.code = `${JokesList.UC_CODE}jokeDaoListFailed`;
      this.message = "List jokes by joke Dao list failed.";
    }
  }
};

let UpdateJoke = {
  UC_CODE: `${UuJokesError.ERROR_PREFIX}joke/update`,
  InvalidDtoIn: class extends UuJokesError {
    constructor() {
      super(...arguments);
      this.code = `${UpdateJoke.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  },
  JokeDaoUpdateFailed: class extends UuJokesError {
    constructor() {
      super(...arguments);
      this.code = `${UpdateJoke.UC_CODE}jokeDaoUpdateFailed`;
      this.message = "Update joke by joke Dao update failed.";
    }
  },
  JokeDaoGetFailed: class extends UuJokesError {
    constructor() {
      super(...arguments);
      this.code = `${UpdateJoke.UC_CODE}jokeDaoGetFailed`;
      this.message = "Get joke by joke Dao get failed.";
    }
  }
};
let DeleteJoke = {
  UC_CODE: `${UuJokesError.ERROR_PREFIX}joke/delete`,
  InvalidDtoIn: class extends UuJokesError {
    constructor() {
      super(...arguments);
      this.code = `${DeleteJoke.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  },
  JokeDaoDeleteFailed: class extends UuJokesError {
    constructor() {
      super(...arguments);
      this.code = `${DeleteJoke.UC_CODE}jokeDaoDeleteFailed`;
      this.message = "Delete joke by Dao delete failed.";
    }
  }
};

module.exports = {
  DeleteJoke,
  UpdateJoke,
  JokesList,
  CreateJoke
};
