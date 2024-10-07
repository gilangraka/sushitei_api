const { HttpStatusCode } = require('axios')
const db = require('../../../../db/models');
const produsen = db.m_produsen;
const api = require('../../../helpers/api')
const { Op } = require('sequelize');

class Controller {
  static async list(req, res) {
    try {
      const limit = parseInt(req.query.per_page, 10) || 10;
      const page = parseInt(req.query.page, 10) || 1;
      const offset = (page - 1) * limit;
      const searchData = req.query.search || "";
      const status = req.query.status;

      const whereClause = {
        [Op.or]: [
          { name: { [Op.iLike]: `%${searchData}%` } },
          { address: { [Op.iLike]: `%${searchData}%` } },
          { description: { [Op.iLike]: `%${searchData}%` } },
        ],
        deletedAt: null,
      };

      if (status) {
        whereClause.status = status;
      }

      const results = await produsen.findAndCountAll({
        limit,
        offset,
        where: whereClause,
        order: [['createdAt', 'DESC']],
      });

      res
        .status(HttpStatusCode.Ok)
        .json(api.results(results, HttpStatusCode.Ok, { req: req }))
    } catch (err) {
      err.code =
        typeof err.code !== 'undefined' && err.code !== null
          ? err.code
          : HttpStatusCode.InternalServerError
      res.status(err.code).json(api.results(null, err.code, { err: err }))
    }
  }

  static async show(req, res) {
    try {
      const id = req.params.id;
      const produsenItem = await produsen.findByPk(id, {
        where: { deletedAt: null },
      });

      if (!produsenItem) {
        const err = new Error("Master produsen not found");
        err.code = HttpStatusCode.BadRequest;
        throw err;
      }

      res
        .status(HttpStatusCode.Ok)
        .json(api.results(produsenItem, HttpStatusCode.Ok))
    } catch (err) {
      err.code =
        typeof err.code !== 'undefined' && err.code !== null
          ? err.code
          : HttpStatusCode.InternalServerError
      res.status(err.code).json(api.results(null, err.code, { err: err }))
    }
  }

  static async store(req, res) {
    try {
      const { name, address, description, status } = req.body;

      const newProdusen = await produsen.create({
        name,
        address,
        description,
        status,
      });
      res
        .status(HttpStatusCode.Ok)
        .json(api.results(newProdusen, HttpStatusCode.Ok))
    } catch (err) {
      err.code =
        typeof err.code !== 'undefined' && err.code !== null
          ? err.code
          : HttpStatusCode.InternalServerError
      res.status(err.code).json(api.results(null, err.code, { err: err }))
    }
  }

  static async update(req, res) {
    try {
      const id = req.params.id;
      const produsenData = req.body;
      const produsenItem = await produsen.findByPk(id);

      if (!produsenItem) {
        const err = new Error("Master produsen not found");
        err.code = HttpStatusCode.BadRequest;
        throw err;
      }

      const updatedProdusen = await produsenItem.update(produsenData);

      const results = updatedProdusen ? "Produsen Success Updated" : "Produsen Failed Updated"
      res
        .status(HttpStatusCode.Ok)
        .json(api.results(results, HttpStatusCode.Ok))
    } catch (err) {
      err.code =
        typeof err.code !== 'undefined' && err.code !== null
          ? err.code
          : HttpStatusCode.InternalServerError
      res.status(err.code).json(api.results(null, err.code, { err: err }))
    }
  }

  static async delete(req, res) {
    try {
      const id = req.params.id;
      const produsenItem = await produsen.findByPk(id);

      if (!produsenItem) {
        const err = new Error("Master produsen not found");
        err.code = HttpStatusCode.BadRequest;
        throw err;
      }

      await produsenItem.destroy();
      res
        .status(HttpStatusCode.Ok)
        .json({ message: "Delete master produsen success" });
    } catch (err) {
      err.code =
        typeof err.code !== 'undefined' && err.code !== null
          ? err.code
          : HttpStatusCode.InternalServerError
      res.status(err.code).json(api.results(null, err.code, { err: err }))
    }
  }
}

module.exports = Controller;
