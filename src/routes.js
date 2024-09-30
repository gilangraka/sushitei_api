const router = require("express").Router();
const express = require("express");
const auth = require("./middleware/auth");

router.use(express.json());
router.use(express.urlencoded({ extended: true }));

// MASTER
