// models/Todo.js
const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  completed: {
    type: Boolean,
    required: true
    ,default:false
  }, 
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // foreign key-like relationship
    required: true
  }
});

const Todo = mongoose.model('Todo', todoSchema);
module.exports = Todo;
