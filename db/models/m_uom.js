"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class m_uom extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      m_uom.belongsToMany(models.m_item, {
        through: "item_uom",
        foreignKey: "uom_id",
        otherKey: "item_id",
      });
    }
  }
  m_uom.init(
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      name: {
        type: DataTypes.STRING,
        unique: true,
      },
      description: DataTypes.STRING,
      status: DataTypes.ENUM("active", "inactive"),
    },
    {
      sequelize,
      modelName: "m_uom",
      paranoid: true,
    }
  );
  return m_uom;
};
