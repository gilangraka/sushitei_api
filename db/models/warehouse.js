'use strict';
const { Model } = require('sequelize');
const m_location = require('./m_location');
const m_category = require('./m_category');

module.exports = (sequelize, DataTypes) => {
  class warehouse extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      warehouse.belongsTo(models.m_location, {
        foreignKey: 'location_id',
        as: 'location',
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      })
      warehouse.belongsTo(models.m_category, {
        foreignKey: 'category_id',
        as: 'category',
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      })
      warehouse.hasMany(models.staging_area, {
        foreignKey: 'warehouse_id',
        as: 'staging_area',
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      })
    }
  }
  warehouse.init({
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    name: DataTypes.STRING,
    location_id: {
      type: DataTypes.UUID,
      references: {
        model: m_location,
        key: 'id'
      }
    },
    category_id: {
      type: DataTypes.UUID,
      references: {
        model: m_category,
        key: 'id'
      }
    },
    total_rack: DataTypes.INTEGER,
    total_staging: DataTypes.INTEGER,
    status: DataTypes.ENUM('active', 'inactive')
  }, {
    sequelize,
    modelName: 'warehouse',
    paranoid: true
  });
  return warehouse;
};