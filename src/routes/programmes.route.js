const express = require("express");
const router = express.Router();

const ProgramController = require("../controllers/programmes.controller");
const ProgramValidator = require("../validators/programmes.validator");

router.get("/", ProgramValidator.list(), ProgramController.list);
router.get("/:id", ProgramValidator.get(), ProgramController.get);
router.post("/", ProgramValidator.create(), ProgramController.create);
router.put("/:id", ProgramValidator.edit(), ProgramController.edit);
router.delete("/:id", ProgramValidator.remove(), ProgramController.remove);

module.exports = router;
