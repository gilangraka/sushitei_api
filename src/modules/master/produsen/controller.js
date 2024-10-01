const db = require('../../../../db/models');
const { Op } = require('sequelize');
const produsen = db.m_produsen;

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

      res.status(200).json({ results, total: results.count });
    } catch (err) {
      res.status(500).json({ error: "Internal Server Error", details: err.message });
    }
  }

  static async show(req, res) {
    try {
      const id = req.params.id;
      const produsenItem = await produsen.findByPk(id, {
        where: { deletedAt: null },
      });

      if (!produsenItem) {
        return res.status(404).json({ error: "Produsen not found" });
      }

      res.status(200).json(produsenItem);
    } catch (err) {
      res.status(500).json({ error: "Internal Server Error", details: err.message });
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
      res.status(201).json({ message: "Create Produsen Success.", newProdusen });
    } catch (err) {
      res.status(500).json({ error: "Internal Server Error", details: err.message });
    }
  }

  static async update(req, res) {
    try {
      const id = req.params.id;
      const produsenData = req.body;
      const produsenItem = await produsen.findByPk(id);

      if (!produsenItem) {
        return res.status(404).json({ error: "Produsen not found" });
      }

      const updatedProdusen = await produsenItem.update(produsenData);
      res.status(200).json({ message: "Edit The Produsen Success.", updatedProdusen });
    } catch (err) {
      res.status(500).json({ error: "Internal Server Error", details: err.message });
    }
  }

  static async delete(req, res) {
    try {
      const id = req.params.id;
      const produsenItem = await produsen.findByPk(id);

      if (!produsenItem) {
        return res.status(404).json({ error: "Produsen not found" });
      }

      await produsenItem.destroy();
      res.status(200).json({ message: "Delete Produsen Success." });
    } catch (err) {
      res.status(500).json({ error: "Internal Server Error", details: err.message });
    }
  }
}

module.exports = Controller;
