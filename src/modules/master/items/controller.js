const { HttpStatusCode } = require("axios");
const api = require("../../../helpers/api");
const db = require("../../../../db/models");
const MasterItem = db.m_item;

class Controller {
  static async index(req, res) {
    const limit = parseInt(req.query.per_page, 10) || 10;
    const page = parseInt(req.query.page, 10) || 1;
    const offset = (page - 1) * limit;
    try {
      const data = await MasterItem.findAll({
        limit,
        offset,
        include: [db.item_produsen, db.item_uom],
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
      const data = await MasterItem.findByPk(id, {
        include: [db.item_produsen, db.item_uom],
      });
      if (!data) {
        const err = new Error("Master item not found");
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
    const {
      name,
      code,
      category_id,
      uom_base,
      is_batch,
      sku,
      qr,
      item_group_id,
      status,
      uom_inbound,
      uom_transaction,
      is_expired,
      outbound_method,
      stock_minimum,
      manufacturing_date,
      expired_at,
      country_id,
      uom_id,
      produsen_id,
    } = req.body;
    try {
      if (!Array.isArray(uom_id) || !Array.isArray(produsen_id)) {
        return res.status(400).send({
          message:
            "Data tidak valid. Harap kirimkan item_produsen atau item_uom dalam bentuk array.",
        });
      }
      const checkSku = db.m_item.findOne({
        where: sku,
      });
      if (checkSku) {
        return res
          .status(HttpStatusCode.BadRequest)
          .json(
            api.results(null, HttpStatusCode.BadRequest, "SKU sudah digunakan")
          );
      }
      const validateExist = async (Model, id, message) => {
        const record = await Model.findByPk(id);
        if (!record) throw new Error(message);
      };
      await Promise.all([
        validateExist(db.m_category, category_id, "Category not found"),
        validateExist(db.m_item_group, item_group_id, "Item group not found"),
        validateExist(db.m_country, country_id, "Country not found"),
        validateExist(db.m_uom, uom_inbound, "UOM Inbound not found"),
        validateExist(db.m_uom, uom_transaction, "UOM Inbound not found"),
        validateExist(db.m_uom, uom_base, "UOM Base not found"),
      ]);
      await Promise.all([
        produsen_id.map((item) =>
          validateExist(db.item_produsen, item, `Produsen id ${item} not found`)
        ),
        uom_id.map((item) =>
          validateExist(db.item_uom, item, `UOM id ${item} not found`)
        ),
      ]);

      const result = db.sequelize.transaction(async (transaction) => {
        const data = await MasterCategory.create(
          {
            name,
            code,
            category_id,
            uom_base,
            is_batch,
            sku,
            qr,
            item_group_id,
            status,
            uom_inbound,
            uom_transaction,
            is_expired,
            outbound_method,
            stock_minimum,
            manufacturing_date,
            expired_at,
            country_id,
          },
          { transaction }
        );

        const produsenData = produsen_id.map((item) => ({
          item_id: data.id,
          produsen_id: item,
        }));
        const uomData = uom_id.map((item) => ({
          item_id: data.id,
          uom_id: item[0],
          convertion_factor: item[1],
        }));

        await db.item_produsen.bulkCreate(produsenData, { transaction });
        await db.item_uom.bulkCreate(uomData, { transaction });
        return data;
      });

      res
        .status(HttpStatusCode.Ok)
        .json(api.results(result, HttpStatusCode.Ok));
    } catch (error) {
      return res
        .status(HttpStatusCode.InternalServerError)
        .json(api.results(null, HttpStatusCode.InternalServerError, error));
    }
  }

  static async destroy(req, res) {
    const { id } = req.params;
    try {
      const data = await MasterItem.findByPk(id);
      if (!data) {
        const err = new Error("Master item not found");
        err.code = HttpStatusCode.BadRequest;
        throw err;
      }

      await data.destroy();
      res
        .status(HttpStatusCode.Ok)
        .json({ message: "Success delete Master item" });
    } catch (error) {
      return res
        .status(HttpStatusCode.InternalServerError)
        .json(api.results(null, HttpStatusCode.InternalServerError, error));
    }
  }
}

module.exports = Controller;
