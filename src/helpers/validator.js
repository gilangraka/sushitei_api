const { validationResult } = require("express-validator");
const api = require("./api");
require("./");
const { HttpStatusCode } = require("axios");

function validated(schemas) {
  return async (req, res, next) => {
    await Promise.all(schemas.map((validation) => validation.run(req)));

    const errors = validationResult(req);
    if (errors.isEmpty()) {
      return next();
    }

    errors.name = "schema-validator";
    res
      .status(HttpStatusCode.UnprocessableEntity)
      .json(
        api.results(null, HttpStatusCode.UnprocessableEntity, { err: errors })
      );
  };
}

module.exports = { validated };
