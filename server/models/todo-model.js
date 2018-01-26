var mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate');

var todoSchema = mongoose.Schema({
  title : String,
  description : String,
  date : Date,
  status : String
});

todoSchema.plugin(mongoosePaginate);
const Todo = mongoose.model('Todo', todoSchema);

module.exports = Todo;
