'use strict';
const { Model } = require('sequelize');
const warehouse = require('./warehouse');

module.exports = (sequelize, DataTypes) => {
  class staging_area extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      staging_area.belongsTo(models.warehouse, {
        foreignKey: 'warehouse_id',
        as: 'warehouse',
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      })
    }
  }
  staging_area.init({
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    name: DataTypes.STRING,
    warehouse_id: {
      type: DataTypes.UUID,
      references: {
        model: warehouse,
        key: 'id'
      }
    },
    is_used: DataTypes.ENUM('available', 'used'),
    status: DataTypes.ENUM('active', 'inactive')
  }, {
    sequelize,
    modelName: 'staging_area',
    paranoid: true
  });
  return staging_area;
};