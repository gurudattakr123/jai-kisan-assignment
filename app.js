const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const router = express.Router();
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;


app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());

app.use(router);

const db = require("./models/dbService");

mongoose.connect(db.url, { useNewUrlParser: true }).then(function () {
    console.log("connected");
  }).catch(function (err) {
    console.log("not connected " + err);
  });

app.set("port", 4444);

app.listen(app.get("port"), () => {
    console.info("Express server : started on port " + app.get("port"))
})

var customerRoute = require('./router/customers');


app.use('/customers', customerRoute);


module.exports = app;
