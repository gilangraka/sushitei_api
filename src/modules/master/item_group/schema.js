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
  name: {
    notEmpty: true,
    errorMessage: "Name is required",
    isString: {
      errorMessage: "Name must be a string",
    },
    isLength: {
      options: { max: 3 },
      errorMessage: "Code maximum length is 3",
    },
  },
});

exports.updateSchema = checkSchema({
  name: {
    isString: {
      errorMessage: "Name must be a string",
    },
    isLength: {
      options: { max: 3 },
      errorMessage: "Code maximum length is 3",
    },
  },
});
