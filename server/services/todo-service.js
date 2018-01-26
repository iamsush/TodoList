var Todo = require('../models/todo-model');


exports.getTodos = async function(query, page, limit){
  var options = {
    page,
    limit
  };
  try{
    var todos = await Todo.paginate(query, options);
    return todos;
  }
  catch(e){
    throw Error('Error while paginating todos');
  }
};

exports.createTodo = async function(todo){
    var newTodo = new Todo({
      title : todo.title,
      description : todo.description,
      date : new Date,
      status : todo.status
    })

    try{
      let savedTodo = await newTodo.save();
      return savedTodo;
    }
    catch(e){
      throw Error('Error while creating Todo');
    }
};

exports.updateTodo = async function(todo){
  var id = todo.id;

  try{
    var oldTodo = await Todo.findById(id);
  }
  catch(e){
    throw Error('Error while finding the Todo');
  }

  if (!oldTodo) return false;

  console.log(oldTodo);
  oldTodo.title = todo.title;
  oldTodo.description = todo.description;
  oldTodo.status = todo.status;

  try{
    let savedTodo = await oldTodo.save();
    return savedTodo;
  }
  catch(e){
    throw Error('Error while creating Todo');
  }
};

exports.deleteTodo = async function(id){
  try{
    var deleted = await Todo.findByIdAndRemove(id);
    return deleted;
  }
  catch(e){
    throw Error('Error while deleting Todo');
  }
};
