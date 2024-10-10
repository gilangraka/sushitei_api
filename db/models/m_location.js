'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class m_location extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      m_location.hasMany(models.warehouse, {
        foreignKey: 'location_id',
        as: 'warehouse',
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      })
    }
  }
  m_location.init({
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    name: DataTypes.STRING,
    type: DataTypes.ENUM('internal', 'rent'),
    code: DataTypes.STRING,
    status: DataTypes.ENUM('active', 'inactive')
  }, {
    sequelize,
    modelName: 'm_location',
    paranoid: true
  });
  return m_location;
};