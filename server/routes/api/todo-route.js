var express = require('express');
var router = express.Router();

var TodoController = require('../../controllers/todo-controller');

router.get('/', TodoController.getTodos);
router.post('/', TodoController.createTodo);
router.put('/', TodoController.updateTodo);
router.delete('/:id', TodoController.deleteTodo);

module.exports = router;
