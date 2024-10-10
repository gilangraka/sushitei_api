'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('warehouses', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4
      },
      name: {
        type: Sequelize.STRING
      },
      location_id: {
        type: Sequelize.UUID,
        references: {
          model: 'm_locations',
          key: 'id'
        }
      },
      category_id: {
        type: Sequelize.UUID,
        references: {
          model: 'm_categories',
          key: 'id'
        }
      },
      total_rack: {
        type: Sequelize.INTEGER
      },
      total_staging: {
        type: Sequelize.INTEGER
      },
      status: {
        type: Sequelize.ENUM(['active', 'inactive'])
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      deletedAt: {
        allowNull: true,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('warehouses');
  }
};