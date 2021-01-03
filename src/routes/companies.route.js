const express = require("express");
const router = express.Router();

const ComapnyController = require("../controllers/companies.controller");
const ComapnyValidator = require("../validators/companies.validator");

router.get("/", ComapnyValidator.list(), ComapnyController.list);
router.get("/:id", ComapnyValidator.get(), ComapnyController.get);
router.post("/", ComapnyValidator.create(), ComapnyController.create);
router.put("/:id", ComapnyValidator.edit(), ComapnyController.edit);
router.delete("/:id", ComapnyValidator.remove(), ComapnyController.remove);

module.exports = router;
