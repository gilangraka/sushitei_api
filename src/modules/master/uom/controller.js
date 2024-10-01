const db = require('../../../../db/models');
const { Op } = require('sequelize');
const uom = db.m_uom;

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

      res.status(200).json({ results, total: results.count });
    } catch (err) {
      res.status(500).json({ error: "Internal Server Error", details: err.message });
    }
  }

  static async show(req, res) {
    try {
      const id = req.params.id;
      const uomItem = await uom.findByPk(id, { where: { deletedAt: null } });

      if (!uomItem) {
        return res.status(404).json({ error: "UOM not found" });
      }

      res.status(200).json(uomItem);
    } catch (err) {
      res.status(500).json({ error: "Internal Server Error", details: err.message });
    }
  }

  static async store(req, res) {
    try {
      const { name, description, status } = req.body;

      const checkUOM = await uom.findOne({
        where: { name: name }
      });

      if(checkUOM) {
        return res.status(400).json({ error: "UOM name already exists." });
      }

      const newUOM = await uom.create({ 
        name, 
        description, 
        status 
      });
      res.status(201).json({ message: "Create UOM Success.", newUOM });
    } catch (err) {
      res.status(500).json({ error: "Internal Server Error", details: err.message });
    }
  }

  static async update(req, res) {
    try {
      const id = req.params.id;
      const uomData = req.body;
      const uomItem = await uom.findByPk(id);

      if (!uomItem) {
        return res.status(404).json({ error: "UOM not found" });
      }

      const updatedUOM = await uomItem.update(uomData);
      res.status(200).json({ message: "Edit The UOM Success.", updatedUOM });
    } catch (err) {
      res.status(500).json({ error: "Internal Server Error", details: err.message });
    }
  }

  static async delete(req, res) {
    try {
      const id = req.params.id;
      const uomItem = await uom.findByPk(id);

      if (!uomItem) {
        return res.status(404).json({ error: "UOM not found" });
      }

      await uomItem.destroy();
      res.status(200).json({ message: "Delete UOM Success." });
    } catch (err) {
      res.status(500).json({ error: "Internal Server Error", details: err.message });
    }
  }
}

module.exports = Controller;