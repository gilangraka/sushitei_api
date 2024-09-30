const { checkSchema } = require("express-validator");

exports.storeSchema = checkSchema({
  name: {
    notEmpty: true,
    errorMessage: "Name is required",
    isString: {
      errorMessage: "Name must be a string",
    },
  },
});

exports.updateSchema = checkSchema({
  name: {
    isString: {
      errorMessage: "Name must be a string",
    },
  },
});

exports.allSchema = checkSchema({
  limit: {
    optional: {
      nullable: true,
    },
    isNumeric: true,
    errorMessage: "limit must be numeric",
  },
});

exports.listSchema = checkSchema({
  per_page: {
    optional: {
      nullable: true,
    },
    isNumeric: true,
    errorMessage: "Per page must be numeric",
  },
  page: {
    optional: {
      nullable: true,
    },
    isNumeric: true,
    errorMessage: "Page must be numeric",
  },
});
