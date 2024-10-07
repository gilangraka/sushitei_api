const { HttpStatusCode } = require('axios')
const db = require('../../../../db/models');
const uom = db.m_uom;
const api = require('../../../helpers/api')
const { Op } = require('sequelize');

class Controller {
  static async list(req, res) {
    try {
      const limit = parseInt(req.query.per_page, 10) || 10;
      const page = parseInt(req.query.page, 10) || 1;
      const offset = (page - 1) * limit;
      const searchData = req.query.search || "";

      const results = await uom.findAndCountAll({
        limit,
        offset,
        where: {
          [Op.or]: [
            { name: { [Op.iLike]: `%${searchData}%` } },
            { description: { [Op.iLike]: `%${searchData}%` } },
          ],
          deletedAt: null,
        },
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
      const uomItem = await uom.findByPk(id, { where: { deletedAt: null } });

      if (!uomItem) {
        const err = new Error("Master UOM not found");
        err.code = HttpStatusCode.BadRequest;
        throw err;
      }

      res
        .status(HttpStatusCode.Ok)
        .json(api.results(uomItem, HttpStatusCode.Ok))
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
      const { name, description, status } = req.body;

      const checkUOM = await uom.findOne({
        where: { name: name }
      });

      if(checkUOM) {
        const err = new Error("Master UOM name already exist");
        err.code = HttpStatusCode.BadRequest;
        throw err;
      }

      const newUOM = await uom.create({ 
        name, 
        description, 
        status 
      });
      res
        .status(HttpStatusCode.Ok)
        .json(api.results(newUOM, HttpStatusCode.Ok))
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
      const uomData = req.body;
      const uomItem = await uom.findByPk(id);

      if (!uomItem) {
        const err = new Error("Master UOM not found");
        err.code = HttpStatusCode.BadRequest;
        throw err;
      }

      const updatedUOM = await uomItem.update(uomData);

      const results = updatedUOM ? "Produsen Success Updated" : "Produsen Failed Updated"
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
      const uomItem = await uom.findByPk(id);

      if (!uomItem) {
        const err = new Error("Master UOM not found");
        err.code = HttpStatusCode.BadRequest;
        throw err;
      }

      await uomItem.destroy();
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