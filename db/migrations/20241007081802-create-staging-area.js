'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('staging_areas', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4
      },
      name: {
        type: Sequelize.STRING
      },
      warehouse_id: {
        type: Sequelize.UUID,
        references: {
          model: 'warehouses',
          key: 'id'
        }
      },
      is_used: {
        type: Sequelize.ENUM(['available', 'used'])
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
    await queryInterface.dropTable('staging_areas');
  }
};