const { checkSchema } = require("express-validator");

const uuidValidation = (field, isRequired = true) => {
  const validation = {
    isUUID: {
      errorMessage: `${field} must be a UUID`,
    },
  };

  if (isRequired) {
    validation.notEmpty = {
      errorMessage: `${field} is required`,
    };
  }

  return validation;
};
const stringValidation = (field, maxLength, isRequired = true) => {
  const validation = {
    isString: {
      errorMessage: `${field} must be a string`,
    },
    isLength: {
      options: { max: maxLength },
      errorMessage: `${field} maximum length is ${maxLength}`,
    },
  };

  if (isRequired) {
    validation.notEmpty = {
      errorMessage: `${field} is required`,
    };
  }

  return validation;
};
const enumValidation = (field, validValues, isRequired = true) => {
  const validation = {};

  if (isRequired) {
    validation.notEmpty = {
      errorMessage: `${field} is required`,
    };
  }

  validation.custom = {
    options: (value) => {
      if (!validValues.includes(value)) {
        throw new Error(`Invalid ${field} value`);
      }
      return true;
    },
  };

  return validation;
};

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
  name: stringValidation("Name", 50),
  code: stringValidation("Code", 20),
  category_id: uuidValidation("Category ID"),
  uom_base: uuidValidation("UOM Base"),
  is_batch: {
    notEmpty: true,
    errorMessage: "Batch is required",
    isInt: {
      errorMessage: "Batch must be a Integer",
    },
  },
  sku: stringValidation("SKU", 50),
  qr: stringValidation("QR", 50),
  item_group_id: uuidValidation("Item Group ID"),
  status: enumValidation("Status", ["active", "inactive"]),
  uom_inbound: uuidValidation("UOM Inbound"),
  uom_transaction: uuidValidation("UOM Transaction"),
  is_expired: enumValidation("Is Expired", ["yes", "no"]),
  outbound_method: enumValidation("Outbound Method", ["fifo", "fefo"]),
  stock_minimum: {
    notEmpty: true,
    errorMessage: "Stock Minimum is required",
    isInt: {
      errorMessage: "Stock Minimum must be a integer",
    },
  },
  manufacturing_date: {
    notEmpty: true,
    errorMessage: "Manufacturing Date is required",
    isDate: {
      errorMessage: "Manufacturing Date must be a date",
    },
  },
  expired_at: {
    notEmpty: true,
    errorMessage: "Expired At is required",
    isDate: {
      errorMessage: "Expired At must be a date",
    },
  },
  country_id: uuidValidation("Country ID"),
  uom_id: {
    notEmpty: true,
    isArray: {
      errorMessage: "Item UOM must be array",
    },
  },
  produsen_id: {
    notEmpty: true,
    isArray: {
      errorMessage: "Item Produsen must be array",
    },
  },
});
