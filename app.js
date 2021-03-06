var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var xmlparser = require("express-xml-bodyparser");

var authMiddleware = require("./middleware/authMiddleware");
var allegroMiddleware = require("./middleware/allegroMiddleware");

var indexRouter = require("./routes/index");
var skapiecRouter = require("./routes/XMLskapiec");
var ceneoRouter = require("./routes/XMLceneo");
var facebookRouter = require("./routes/XMLfacebook");
var usersRouter = require("./routes/users");
var webhook = require("./routes/webhook");

// var auctions = require('./routes/auctions');
var auth = require("./routes/auth");
var orders = require("./routes/orders");
var products = require("./routes/products");
var producers = require("./routes/producers");
var orderedProducts = require("./routes/orderedProducts");
var shippingsMethod = require("./routes/shippingsMethod");

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(xmlparser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/xml/skapiec", skapiecRouter);
app.use("/xml/ceneo", ceneoRouter);
app.use("/xml/facebook", facebookRouter);
app.use("/", indexRouter);
app.use("/auth", auth);
app.use("/orders", orders);
app.use("/products", products);
app.use("/producers", producers);
app.use("/ordered-products", orderedProducts);
app.use("/shippings-method", shippingsMethod);
app.use("/users", usersRouter);
// app.use("/webhook", allegroMiddleware, authMiddleware, webhook);

// app.use("/webhook", authMiddleware, webhook);
// app.use('/auctions', allegroMiddleware, authMiddleware, auctions);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
