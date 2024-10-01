'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class m_produsen extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  m_produsen.init({
    id: {
      type: DataTypes.UUID,
      primaryKey: true
    },
    name: DataTypes.STRING,
    address: DataTypes.TEXT,
    description: DataTypes.TEXT,
    status: DataTypes.ENUM('active', 'inactive')
  }, {
    sequelize,
    modelName: 'm_produsen',
    paranoid: true,
  });
  return m_produsen;
};