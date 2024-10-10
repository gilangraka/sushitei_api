"use strict";
const { Model } = require("sequelize");
const m_item = require("./m_item");
const m_produsen = require("./m_produsen");
module.exports = (sequelize, DataTypes) => {
  class item_produsen extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  item_produsen.init(
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      item_id: {
        type: DataTypes.UUID,
        references: {
          model: m_item,
          key: "id",
        },
      },
      produsen_id: {
        type: DataTypes.UUID,
        references: {
          model: m_produsen,
          key: "id",
        },
      },
    },
    {
      sequelize,
      modelName: "item_produsen",
    }
  );
  return item_produsen;
};
