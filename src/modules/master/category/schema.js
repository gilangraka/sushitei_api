const { checkSchema } = require("express-validator");

exports.indexSchema = checkSchema({
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

exports.storeSchema = checkSchema({
  code: {
    notEmpty: true,
    errorMessage: "Code is required",
    isString: {
      errorMessage: "Code must be a string",
    },
    isLength: {
      options: { max: 3 },
      errorMessage: "Code maximum length is 3",
    },
  },
  description: {
    notEmpty: true,
    errorMessage: "Code is required",
    isString: {
      errorMessage: "Code must be a string",
    },
  },
});

exports.updateSchema = checkSchema({
  code: {
    isString: {
      errorMessage: "Code must be a string",
    },
    isLength: {
      options: { max: 3 },
      errorMessage: "Code maximum length is 3",
    },
  },
  description: {
    isString: {
      errorMessage: "Code must be a string",
    },
  },
});
