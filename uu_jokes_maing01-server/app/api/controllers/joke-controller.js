"use strict";
const JokeAbl = require("../../abl/joke-abl.js");

class JokeController {
  list(ucEnv) {
    return JokeAbl.list(ucEnv.getUri().getAwid(), ucEnv.getDtoIn(),  ucEnv.getAuthorizationResult(),ucEnv.getSession());
  }

  create(ucEnv) {
    return JokeAbl.create(ucEnv.getUri().getAwid(), ucEnv.getDtoIn(), ucEnv.getAuthorizationResult(), ucEnv.getSession());
  }

  update(ucEnv) {
    return JokeAbl.update(ucEnv.getUri().getAwid(), ucEnv.getDtoIn(),  ucEnv.getAuthorizationResult(),ucEnv.getSession());
  }

  delete(ucEnv) {
    return JokeAbl.delete(ucEnv.getUri().getAwid(), ucEnv.getDtoIn(), ucEnv.getAuthorizationResult(),ucEnv.getSession());
  }

}

module.exports = new JokeController();
