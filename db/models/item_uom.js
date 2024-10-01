"use strict";
const { Model } = require("sequelize");
const m_uom = require("./m_uom");
const { m_item } = require(".");
module.exports = (sequelize, DataTypes) => {
  class item_uom extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  item_uom.init(
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
      },
      item_id: {
        type: DataTypes.UUID,
        references: {
          model: m_item,
          key: "id",
        },
      },
      uom_id: {
        type: DataTypes.UUID,
        references: {
          model: m_uom,
          key: "id",
        },
      },
      convertion_factor: DataTypes.DECIMAL,
    },
    {
      sequelize,
      modelName: "item_uom",
    }
  );
  return item_uom;
};
