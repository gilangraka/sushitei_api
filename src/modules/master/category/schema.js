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
  },
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
    errorMessage: "Description is required",
    isString: {
      errorMessage: "Description must be a string",
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
  },
  code: {
    optional: true,
    notEmpty: {
      errorMessage: "Code cannot be empty",
    },
    isString: {
      errorMessage: "Code must be a string",
    },
    isLength: {
      options: { max: 3 },
      errorMessage: "Code maximum length is 3",
    },
  },
  description: {
    optional: true,
    notEmpty: {
      errorMessage: "Description cannot be empty",
    },
    isString: {
      errorMessage: "Description must be a string",
    },
  },
});
