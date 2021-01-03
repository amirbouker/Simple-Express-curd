const express = require("express");
const router = express.Router();

const TransactionController = require("../controllers/transactions.controller");
const TransactionValidator = require("../validators/transactions.validator");

router.get("/", TransactionValidator.list(), TransactionController.list);
router.get("/:id", TransactionValidator.get(), TransactionController.get);
router.post("/", TransactionValidator.create(), TransactionController.create);
router.put("/:id", TransactionValidator.edit(), TransactionController.edit);
router.delete(
  "/:id",
  TransactionValidator.remove(),
  TransactionController.remove
);

module.exports = router;
