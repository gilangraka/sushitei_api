const router = require("express").Router();
const express = require("express");

router.use(express.json());
router.use(express.urlencoded({ extended: true }));

// MASTER
router.use("/master/category", require("./modules/master/category"));
router.use("/master/item-group", require("./modules/master/item_group"));
router.use("/master/country", require("./modules/master/country"));
router.use("/master/items", require("./modules/master/items"));
router.use("/master/uom", require("./modules/master/uom"));
router.use("/master/produsen", require("./modules/master/produsen"));

module.exports = router;
