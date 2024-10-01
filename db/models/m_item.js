"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class m_item extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      m_item.belongsTo(models.m_category, {
        foreignKey: "category_id",
        as: "category",
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
      });
      m_item.belongsTo(models.m_uom, {
        foreignKey: "uom_base",
        as: "uomBase",
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
      });
      m_item.belongsTo(models.m_item_group, {
        foreignKey: "item_group_id",
        as: "itemGroup",
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
      });
      m_item.belongsTo(models.m_uom, {
        foreignKey: "uom_inbound",
        as: "uomInbound",
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
      });
      m_item.belongsTo(models.m_uom, {
        foreignKey: "uom_transaction",
        as: "uomTransaction",
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
      });
      m_item.belongsTo(models.m_country, {
        foreignKey: "country_id",
        as: "country",
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
      });
    }
  }
  m_item.init(
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
      },
      name: DataTypes.STRING,
      code: DataTypes.STRING,
      category_id: DataTypes.UUID,
      uom_base: DataTypes.UUID,
      is_batch: DataTypes.INTEGER,
      sku: DataTypes.STRING,
      qr: DataTypes.STRING,
      item_group_id: DataTypes.UUID,
      status: DataTypes.ENUM("active", "inactive"),
      uom_inbound: DataTypes.UUID,
      uom_transaction: DataTypes.UUID,
      is_expired: DataTypes.ENUM("yes", "no"),
      outbound_method: DataTypes.ENUM("fifo", "fefo"),
      stock_minimum: DataTypes.INTEGER,
      manufacturing_date: DataTypes.DATE,
      expired_at: DataTypes.DATE,
      country_id: DataTypes.UUID,
    },
    {
      sequelize,
      modelName: "m_item",
      paranoid: true,
    }
  );
  return m_item;
};
