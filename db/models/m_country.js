"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class m_country extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  m_country.init(
    {
      name: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "m_country",
      timestamps: true,
      paranoid: true,
    }
  );
  return m_country;
};
