"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("m_items", {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      name: {
        type: Sequelize.STRING(50),
      },
      code: {
        type: Sequelize.STRING(20),
      },
      category_id: {
        type: Sequelize.UUID,
        references: {
          model: "m_categories",
          key: "id",
        },
      },
      uom_base: {
        type: Sequelize.UUID,
        references: {
          model: "m_uoms",
          key: "id",
        },
      },
      is_batch: {
        type: Sequelize.INTEGER,
      },
      sku: {
        type: Sequelize.STRING(50),
        unique: true,
      },
      qr: {
        type: Sequelize.STRING(50),
      },
      item_group_id: {
        type: Sequelize.UUID,
        references: {
          model: "m_item_groups",
          key: "id",
        },
      },
      status: {
        type: Sequelize.ENUM(["active", "inactive"]),
      },
      uom_inbound: {
        type: Sequelize.UUID,
        references: {
          model: "m_uoms",
          key: "id",
        },
      },
      uom_transaction: {
        type: Sequelize.UUID,
        references: {
          model: "m_uoms",
          key: "id",
        },
      },
      is_expired: {
        type: Sequelize.ENUM(["yes", "no"]),
      },
      outbound_method: {
        type: Sequelize.ENUM(["fifo", "fefo"]),
      },
      stock_minimum: {
        type: Sequelize.INTEGER,
      },
      manufacturing_date: {
        type: Sequelize.DATE,
      },
      expired_at: {
        type: Sequelize.DATE,
      },
      country_id: {
        type: Sequelize.UUID,
        references: {
          model: "m_countries",
          key: "id",
        },
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      deletedAt: {
        allowNull: true,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("m_items");
  },
};
