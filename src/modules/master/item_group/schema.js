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
    notEmpty: {
      errorMessage: "Name is required",
    },
    isString: {
      errorMessage: "Name must be a string",
    },
    isLength: {
      options: { max: 50 },
      errorMessage: "Name maximum length is 50",
    },
  },
});

exports.updateSchema = checkSchema({
  name: {
    optional: true,
    notEmpty: {
      errorMessage: "Name cannot be empty",
    },
    isString: {
      errorMessage: "Name must be a string",
    },
    isLength: {
      options: { max: 50 },
      errorMessage: "Name maximum length is 50",
    },
  },
});
