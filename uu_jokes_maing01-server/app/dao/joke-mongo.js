"use strict";
const { UuObjectDao } = require("uu_appg01_server").ObjectStore;

class JokeMongo extends UuObjectDao {

  async createSchema() {
    await super.createIndex({ awid: 1, _id: 1 }, { unique: true });
  }

  async get(awid, id) {
    return await super.findOne({ awid, id });
  }

  async create(uuObject) {
    return await super.insertOne(uuObject);
  }

  async update(uuObject) {
    let filter = { id: uuObject.id, awid: uuObject.awid };

    return await super.findOneAndUpdate(filter, uuObject, "NONE");
  }

  async delete(awid, id) {
    return await super.deleteOne({ awid, id });
  }

  async list(awid, pageInfo, sortBy, order) {
    let sort = {};
    sort[sortBy] = order;
    return await super.find({ awid }, pageInfo, sort);
  }

}

module.exports = JokeMongo;
