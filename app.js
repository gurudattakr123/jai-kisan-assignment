const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const router = express.Router();
const appRouter = require("./routes");


app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());

app.use(router);


app.set("port", 4444);

app.use(function error_handler(err, req, res, next) {
    res.header("Content-Type", "application/json; charset=utf-8");
    res.status(err.code || 500).send(
        JSON.stringify(err.msg, undefined, 2));
    });

app.listen(app.get("port"), () => {
    logger.info("Express server : started on port " + app.get("port"))
})

router.get('/v1/customers')
router.delete('/v1/customer/:id')
router.post('/v1/customers')
router.post('/v1/:customerId/card')
router.get('/v1/card')

module.exports = app;
