const router = require('express').Router();
const { validated } = require('../../../helpers/validator');
const Controller = require('./controller');
const { listSchema, storeSchema, updatedSchema } = require('./schema');

router.get('/', validated(listSchema), Controller.list);
router.get('/:id', Controller.show);
router.post('/', validated(storeSchema), Controller.store);
router.put('/:id', validated(updatedSchema), Controller.update);
router.delete('/:id', Controller.delete);

module.exports = router;
