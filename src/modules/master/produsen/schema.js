const { checkSchema } = require("express-validator");

exports.listSchema = checkSchema({
  per_page: {
    optional: {
      nullable: true,
    },
    isNumeric: {
      errorMessage: "Per page must be numeric",
    },
  },
  page: {
    optional: {
      nullable: true,
    },
    isNumeric: {
      errorMessage: "Page must be numeric",
    },
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
  address: {
    notEmpty: true,
    errorMessage: "Address is required",
    isLength: {
      options: { min: 10 },
      errorMessage: "Address must not be empty",
    },
  },
  description: {
    notEmpty: true,
    errorMessage: "Description is required",
    isLength: {
      options: { min: 10 },
      errorMessage: "Description must not be empty",
    },
  },
  status: {
    notEmpty: true,
    errorMessage: "Status is required",
    isIn: {
      options: [['active', 'inactive']],
      errorMessage: "Status must be either active or inactive",
    },
  },
});

exports.updatedSchema = checkSchema({
  name: {
    optional: {
      nullable: true,
    },
    isString: {
      errorMessage: "Name must be a string",
    },
  },
  address: {
    optional: {
      nullable: true,
    },
    isLength: {
      options: { min: 1 },
      errorMessage: "Address must not be empty",
    },
  },
  description: {
    optional: {
      nullable: true,
    },
    isLength: {
      options: { min: 1 },
      errorMessage: "Description must not be empty",
    },
  },
  status: {
    optional: {
      nullable: true,
    },
    isIn: {
      options: [['active', 'inactive']],
      errorMessage: "Status must be either active or inactive",
    },
  },
});
