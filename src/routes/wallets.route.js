const express = require("express");
const router = express.Router();

const WalletController = require("../controllers/wallets.controller");
const WalletValidator = require("../validators/wallets.validator");

router.get("/", WalletValidator.list(), WalletController.list);
router.get("/:id", WalletValidator.get(), WalletController.get);
router.put("/:id", WalletValidator.edit(), WalletController.edit);
router.delete("/:id", WalletValidator.remove(), WalletController.remove);

module.exports = router;
