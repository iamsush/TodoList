var express = require('express');
var router = express.Router();

var todoRoute = require('./api/todo-route');

router.use('/todo', todoRoute);

module.exports = router;
