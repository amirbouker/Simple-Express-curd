const express = require('express');
const router = express.Router();

const UsersController = require('../controllers/users.controller');
const UsersValidator = require('../validators/users.validator');

router.get('/', UsersValidator.list(), UsersController.list);
router.get('/:id', UsersValidator.get(), UsersController.get);
router.post('/', UsersValidator.create(), UsersController.create);
router.put('/:id', UsersValidator.edit(), UsersController.edit);
router.delete('/:id', UsersValidator.remove(), UsersController.remove);

module.exports = router;