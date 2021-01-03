const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const debug = require("debug")("fidly-api:app");
const mongoose = require("mongoose");
const routes = require("./src/routes");
const { environment } = require("./config");
mongoose.connect(environment.dbUrl, { useNewUrlParser: true });
// Load middlewares
const ResponseMiddleware = require("./src/middlewares/response.middleware");
const RoutingMiddleware = require("./src/middlewares/routing.middleware");
const ErrorMiddleware = require("./src/middlewares/error.middleware");

// load Routing

// Main express app
const app = express();

// Parsing json body
app.use(express.json());

// secure apps by setting various HTTP headers
app.use(helmet());

// enable CORS - Cross Origin Resource Sharing
app.use(cors());

// Add response custom function
app.use(ResponseMiddleware.setup);

// Api routes
app.use("/api", routes);

// Give access to public static files
app.use("/docs", express.static("public/doc"));

// catch 404 and forward to error handler
app.use(RoutingMiddleware.notFound);

// error handler
app.use(ErrorMiddleware.handler);

module.exports = app;
