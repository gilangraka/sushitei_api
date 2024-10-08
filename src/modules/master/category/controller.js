const { HttpStatusCode } = require("axios");
const api = require("../../../helpers/api");
const db = require("../../../../db/models");
const { Op } = require("sequelize");
const MasterCategory = db.m_category;

class Controller {
  static async index(req, res) {
    const limit = parseInt(req.query.per_page, 10) || 10;
    const page = parseInt(req.query.page, 10) || 1;
    const offset = (page - 1) * limit;
    const searchData = req.query.search || "";

    try {
      const data = await MasterCategory.findAll({
        limit,
        offset,
        where: {
          [Op.or]: [{ name: { [Op.iLike]: `%${searchData}%` } }],
          [Op.or]: [{ code: { [Op.iLike]: `%${searchData}%` } }],
          [Op.or]: [{ description: { [Op.iLike]: `%${searchData}%` } }],
        },
        order: [["createdAt", "DESC"]],
      });
      res.status(HttpStatusCode.Ok).json(api.results(data, HttpStatusCode.Ok));
    } catch (err) {
      const statusCode = err.code || HttpStatusCode.InternalServerError;
      return res
        .status(statusCode)
        .json(api.results(null, statusCode, { err }));
    }
  }

  static async show(req, res) {
    const { id } = req.params;
    try {
      const data = await MasterCategory.findByPk(id);
      if (!data) {
        const error = new Error("Master category not found");
        error.code = HttpStatusCode.BadRequest;

        throw error;
      }

      res.status(HttpStatusCode.Ok).json(api.results(data, HttpStatusCode.Ok));
    } catch (err) {
      const statusCode = err.code || HttpStatusCode.InternalServerError;
      return res
        .status(statusCode)
        .json(api.results(null, statusCode, { err }));
    }
  }

  static async store(req, res) {
    const { name, code, description } = req.body;
    try {
      // Check category.code exist
      const codeExists = await MasterCategory.findOne({
        where: {
          code,
        },
      });
      if (codeExists) {
        const error = new Error("Code exsists");
        error.code = HttpStatusCode.BadRequest;
        throw error;
      }

      const data = await MasterCategory.create({
        name,
        code,
        description,
      });

      res.status(HttpStatusCode.Ok).json(api.results(data, HttpStatusCode.Ok));
    } catch (err) {
      const statusCode = err.code || HttpStatusCode.InternalServerError;
      return res
        .status(statusCode)
        .json(api.results(null, statusCode, { err }));
    }
  }

  static async update(req, res) {
    const { id } = req.params;
    try {
      const data = await MasterCategory.findByPk(id);
      if (!data) {
        const error = new Error("Master category not found");
        error.code = HttpStatusCode.BadRequest;
        throw error;
      }

      await data.update(req.body);
      res.status(HttpStatusCode.Ok).json(api.results(data, HttpStatusCode.Ok));
    } catch (err) {
      const statusCode = err.code || HttpStatusCode.InternalServerError;
      return res
        .status(statusCode)
        .json(api.results(null, statusCode, { err }));
    }
  }

  static async destroy(req, res) {
    const { id } = req.params;
    try {
      const data = await MasterCategory.findByPk(id);
      if (!data) {
        const error = new Error("Master category not found");
        error.code = HttpStatusCode.BadRequest;
        throw error;
      }

      await data.destroy();
      res
        .status(HttpStatusCode.Ok)
        .json({ message: "Success delete master category" });
    } catch (err) {
      const statusCode = err.code || HttpStatusCode.InternalServerError;
      return res
        .status(statusCode)
        .json(api.results(null, statusCode, { err }));
    }
  }
}

module.exports = Controller;
