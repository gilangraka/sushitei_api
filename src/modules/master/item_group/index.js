const Controller = require("./controller");
const router = require("express").Router();
const { validated } = require("../../../helpers/validator");
const { indexSchema, storeSchema, updateSchema } = require("./schema");

router.get("/", validated(indexSchema), Controller.index);
router.get("/:id", Controller.show);
router.post("", validated(storeSchema), Controller.store);
router.put("/:id", validated(updateSchema), Controller.update);
router.delete("/:id", Controller.destroy);

module.exports = router;
