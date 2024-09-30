const { toBoolean } = require("validator");

require("dotenv").config({});

module.exports = {
  local: {
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: process.env.DB_CONNECTION,
    dialectOptions: {
      ssl: {
        require: toBoolean(process.env.DB_SSL),
        rejectUnauthorized: false,
      },
      bigNumberStrings: true,
    },
  },
  development: {
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: process.env.DB_CONNECTION,
    // dialectOptions: {
    //   ssl: {
    //     require: toBoolean(process.env.DB_SSL),
    //     rejectUnauthorized: false,
    //   },
    //   bigNumberStrings: true,
    // },
  },
  staging: {
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: process.env.DB_CONNECTION,
    dialectOptions: {
      ssl: {
        require: toBoolean(process.env.DB_SSL),
        rejectUnauthorized: false,
      },
      bigNumberStrings: true,
    },
  },
  production: {
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: process.env.DB_CONNECTION,
    dialectOptions: {
      ssl: {
        require: toBoolean(process.env.DB_SSL),
        rejectUnauthorized: false,
      },
      bigNumberStrings: true,
    },
  },
};
