const router = require("express").Router();
const express = require("express");
const auth = require("./middleware/auth");

router.use(express.json());
router.use(express.urlencoded({ extended: true }));

// MASTER
router.use("/master/category", require("./modules/master/category"));
router.use("/master/item-group", require("./modules/master/item_group"));
