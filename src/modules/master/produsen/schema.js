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
    optional: {
      nullable: true,
    },
    isString: {
      errorMessage: "Name must be a string",
    },
  },
  description: {
    optional: {
      nullable: true,
    },
    isString: {
      errorMessage: "Description must be a text",
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

exports.updatedSchema = checkSchema({
  name: {
    optional: {
      nullable: true,
    },
    isString: {
      errorMessage: "Name must be a string",
    },
  },
  description: {
    optional: {
      nullable: true,
    },
    isString: {
      errorMessage: "Description must be a text",
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
