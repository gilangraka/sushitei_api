const { HttpStatusCode } = require("axios");
const api = require("../../../helpers/api");
const db = require("../../../../db/models");
const MasterItemGroup = db.m_item_group;

class Controller {
  static async index(req, res) {
    const limit = parseInt(req.query.per_page, 10) || 10;
    const page = parseInt(req.query.page, 10) || 1;
    const offset = (page - 1) * limit;
    try {
      const data = await MasterItemGroup.findAll({
        limit,
        offset,
      });
      res.status(HttpStatusCode.Ok).json(api.results(data, HttpStatusCode.Ok));
    } catch (error) {
      return res
        .status(HttpStatusCode.InternalServerError)
        .json(api.results(null, HttpStatusCode.InternalServerError, error));
    }
  }

  static async show(req, res) {
    const { id } = req.params;
    try {
      const data = await MasterItemGroup.findByPk(id);
      if (!data) {
        const err = new Error("Master item group not found");
        err.code = HttpStatusCode.BadRequest;
        throw err;
      }
      return res
        .status(HttpStatusCode.Ok)
        .json(api.results(data, HttpStatusCode.Ok));
    } catch (error) {
      return res
        .status(HttpStatusCode.InternalServerError)
        .json(api.results(null, HttpStatusCode.InternalServerError, error));
    }
  }

  static async store(req, res) {
    const { name } = req.body;
    try {
      const data = await MasterItemGroup.create({ name });
      return res
        .status(HttpStatusCode.Ok)
        .json(api.results(data, HttpStatusCode.Ok));
    } catch (error) {
      return res
        .status(HttpStatusCode.InternalServerError)
        .json(api.results(null, HttpStatusCode.InternalServerError, error));
    }
  }

  static async update(req, res) {
    const { id } = req.params;
    try {
      const data = await MasterItemGroup.findByPk(id);
      if (!data) {
        const err = new Error("Master item group not found");
        err.code = HttpStatusCode.BadRequest;
        throw err;
      }

      await data.update(req.body);
      return res
        .status(HttpStatusCode.Ok)
        .json(api.results(data, HttpStatusCode.Ok));
    } catch (error) {
      return res
        .status(HttpStatusCode.InternalServerError)
        .json(api.results(null, HttpStatusCode.InternalServerError, error));
    }
  }

  static async destroy(req, res) {
    const { id } = req.params;
    try {
      const data = await MasterItemGroup.findByPk(id);
      if (!data) {
        const err = new Error("Master item group not found");
        err.code = HttpStatusCode.BadRequest;
        throw err;
      }

      await data.destroy();
      return res
        .status(HttpStatusCode.Ok)
        .json(api.results(null, HttpStatusCode.Ok));
    } catch (error) {
      return res
        .status(HttpStatusCode.InternalServerError)
        .json(api.results(null, HttpStatusCode.InternalServerError, error));
    }
  }
}

module.exports = Controller;
