const express = require("express");
const router = express.Router();

const AuthRoute = require("./auth.route");
const UsersRoute = require("./users.route");
const WalletsRoute = require("./wallets.route");
const CompaniesRoute = require("./companies.route");
const ProgrammesRoute = require("./programmes.route");
const transactionsRoute = require("./transactions.routes");
const AuthMiddleware = require("../middlewares/auth.middleware");

router.use("/auth", AuthRoute);
router.use("/users", UsersRoute);
router.use("/wallet", WalletsRoute);
router.use("/company", CompaniesRoute);
router.use("/program", ProgrammesRoute);
router.use("/transaction", transactionsRoute);

module.exports = router;
