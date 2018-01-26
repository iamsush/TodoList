var TodoService = require('../services/todo-service');


exports.getTodos = async function(req, res, next){
  var page = req.query.page ? req.query.page : 1;
  var limit = req.query.limit ? req.query.limit : 10;

  try{
      let todos = await TodoService.getTodos({}, page, limit);
      return res.status(200).json({
        status : 200,
        data : todos,
        message : 'Successfully Todos recieved'
      });
  }
  catch(e){
    return res.status(400).json({
      status : 400,
      message : e.message
    });
  }
};

exports.createTodo = async function(req, res, next){
  var todo = {
    title : req.body.title,
    description : req.body.description,
    status : req.body.status
  }
  try{
    let createTodo = TodoService.createTodo(todo);
    return res.status(201).json({
      status : 201,
      message : 'Successfully created Todo'
    })
  }
  catch(e){
    return res.status(400).json({
      status : 400,
      message : e.message
    })
  }
};

exports.updateTodo = async function(req, res, next){
  if(!req.body._id)
    return res.status(400).json({
      status : 400,
      message : 'Id must be present'
    })

  let id = req.body._id;

  let todo = {
    id,
    title : req.body.title ? req.body.title : null,
    description : req.body.description ? req.body.description : null,
    status : req.body.status ? req.body.status : null
  }

  try{
    let updatedTodo = await TodoService.updateTodo(todo);
    return res.status(200).json({
      status : 200,
      data : updatedTodo,
      message : 'Successfully updated Todo'
    })
  }
  catch(e){
    return res.status(400).json({
      status : 400,
      message : e.message
    })
  }
}

exports.deleteTodo = async function(req, res, next){
    let id = req.params.id;

    try{
      let deletedTodo = await TodoService.deleteTodo(id);
      return res.status(204).json({
        status : 204,
        message : 'Successfully deleted Todo'
      })
    }
    catch(e){
      return res.status(400).json({
        status : 400,
        message : e.message
      })
    }
}
