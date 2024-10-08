"use strict";

const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
const process = require("process");
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || "development";
const config = require(__dirname + "/../../config/config.js")[env];
const db = {};

let sequelize;

if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config
  );
}

fs.readdirSync(__dirname)
  .filter((file) => {
    return (
      file.indexOf(".") !== 0 &&
      file !== basename &&
      file.slice(-3) === ".js" &&
      file.indexOf(".test.js") === -1
    );
  })
  .forEach((file) => {
    const model = require(path.join(__dirname, file))(
      sequelize,
      Sequelize.DataTypes
    );
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.m_category = require("./m_category")(sequelize, Sequelize);
db.m_item_group = require("./m_item_group")(sequelize, Sequelize);
db.m_country = require("./m_country")(sequelize, Sequelize);
db.m_uom = require("./m_uom")(sequelize, Sequelize);
db.m_produsen = require("./m_produsen")(sequelize, Sequelize);
db.m_item = require("./m_item")(sequelize, Sequelize);
db.item_uom = require("./item_uom")(sequelize, Sequelize);
db.item_produsen = require("./item_produsen")(sequelize, Sequelize);

db.m_item.associate(db);
db.m_uom.associate(db);

module.exports = db;
