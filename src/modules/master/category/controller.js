const { HttpStatusCode } = require("axios");
const api = require("../../../helpers/api");
const db = require("../../../../db/models");
const MasterCategory = db.m_category;

class Controller {
  static async index(req, res) {
    const limit = parseInt(req.query.per_page, 10) || 10;
    const page = parseInt(req.query.page, 10) || 1;
    const offset = (page - 1) * limit;
    try {
      const data = await MasterCategory.findAll({
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
      const data = await MasterCategory.findByPk(id);
      if (!data) {
        const err = new Error("Master category not found");
        err.code = HttpStatusCode.BadRequest;

        throw err;
      }

      res.status(HttpStatusCode.Ok).json(api.results(data, HttpStatusCode.Ok));
    } catch (error) {
      return res
        .status(HttpStatusCode.InternalServerError)
        .json(api.results(null, HttpStatusCode.InternalServerError, error));
    }
  }

  static async store(req, res) {
    const { code, description } = req.body;
    try {
      const data = await MasterCategory.create({
        code,
        description,
      });

      res.status(HttpStatusCode.Ok).json(api.results(data, HttpStatusCode.Ok));
    } catch (error) {
      return res
        .status(HttpStatusCode.InternalServerError)
        .json(api.results(null, HttpStatusCode.InternalServerError, error));
    }
  }

  static async update(req, res) {
    const { id } = req.params;
    try {
      const data = await MasterCategory.findByPk(id);
      if (!data) {
        const err = new Error("Master category not found");
        err.code = HttpStatusCode.BadRequest;

        throw err;
      }

      await data.update(req.body);
      res.status(HttpStatusCode.Ok).json(api.results(data, HttpStatusCode.Ok));
    } catch (error) {
      return res
        .status(HttpStatusCode.InternalServerError)
        .json(api.results(null, HttpStatusCode.InternalServerError, error));
    }
  }

  static async destroy(req, res) {
    const { id } = req.params;
    try {
      const data = await MasterCategory.findByPk(id);
      if (!data) {
        const err = new Error("Master category not found");
        err.code = HttpStatusCode.BadRequest;
        throw err;
      }

      await data.destroy();
      res
        .status(HttpStatusCode.Ok)
        .json({ message: "Success delete master category" });
    } catch (error) {
      return res
        .status(HttpStatusCode.InternalServerError)
        .json(api.results(null, HttpStatusCode.InternalServerError, error));
    }
  }
}

module.exports = Controller;
