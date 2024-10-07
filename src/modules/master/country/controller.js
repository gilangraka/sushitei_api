const { HttpStatusCode } = require("axios");
const api = require("../../../helpers/api");
const db = require("../../../../db/models");
const { Op } = require("sequelize");
const MasterCountry = db.m_country;

class Controller {
  static async index(req, res) {
    const limit = parseInt(req.query.per_page, 10) || 10;
    const page = parseInt(req.query.page, 10) || 1;
    const offset = (page - 1) * limit;
    const searchData = req.query.search || "";

    try {
      const data = await MasterCountry.findAll({
        limit,
        offset,
        where: {
          [Op.or]: [{ name: { [Op.iLike]: `%${searchData}%` } }],
        },
        order: [["createdAt", "DESC"]],
      });

      res.status(HttpStatusCode.Ok).json(api.results(data, HttpStatusCode.Ok));
    } catch (error) {
      const statusCode = error.code || HttpStatusCode.InternalServerError;
      return res
        .status(statusCode)
        .json(api.results(null, statusCode, error.message || error));
    }
  }

  static async show(req, res) {
    const { id } = req.params;
    try {
      const data = await MasterCountry.findByPk(id);
      if (!data) {
        const err = new Error("Country not found");
        err.code = HttpStatusCode.BadRequest;
        throw err;
      }

      res.status(HttpStatusCode.Ok).json(api.results(data, HttpStatusCode.Ok));
    } catch (error) {
      const statusCode = error.code || HttpStatusCode.InternalServerError;
      return res
        .status(statusCode)
        .json(api.results(null, statusCode, error.message || error));
    }
  }

  static async store(req, res) {
    const { name } = req.body;
    try {
      const data = await MasterCountry.create({
        name,
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
      const data = await MasterCountry.findByPk(id);
      if (!data) {
        const err = new Error("Master country not found");
        err.code = HttpStatusCode.BadRequest;
        throw err;
      }
      await data.update(req.body);
      res.status(HttpStatusCode.Ok).json(api.results(data, HttpStatusCode.Ok));
    } catch (error) {
      const statusCode = error.code || HttpStatusCode.InternalServerError;
      return res
        .status(statusCode)
        .json(api.results(null, statusCode, error.message || error));
    }
  }

  static async destroy(req, res) {
    const { id } = req.params;
    try {
      const data = await MasterCountry.findByPk(id);
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
