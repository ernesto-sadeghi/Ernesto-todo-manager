const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const User = require('./models/user');
const Todo = require('./models/todo');

const app = express();


app.use(express.json()); 
app.use(cors());        


const dbURI = 'mongodb+srv://ernestosadeghi:123eee@ernesto.aws3plc.mongodb.net/?retryWrites=true&w=majority&appName=ernesto';
mongoose.connect(dbURI)
  .then(() => {
    console.log("Connected to DB");
    app.listen(5000, () => console.log('Server is running on port 5000'));
  })
  .catch(err => console.log(err));



app.post("/signup", async (req, res) => {
  try {
    const { email } = req.body;
    const user = new User({ email });
    await user.save();
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});



app.get("/login", async (req, res) => {
  try {
    const { email } = req.query;
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


//  GET /get-todos?userId=xyz
app.get("/get-todos", async (req, res) => {
  try {
    const { userId } = req.query;
    const todos = await Todo.find({ user: userId }).populate("user", "email");
    res.json(todos);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// POST /todo-add
app.post("/todo-add", async (req, res) => {
  try {
    const { title,subContent, completed, user ,color,deadline } = req.body;
    const todo = new Todo({ title ,subContent, completed, user ,color, deadline:deadline?new Date(deadline):null });
    await todo.save();
    res.status(201).json(todo);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});


// PATCH  /todo-toggle/:id
app.patch("/todo-toggle/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const todo = await Todo.findById(id);
    if (!todo) return res.status(404).json({ message: "Todo not found" });
    todo.completed = !todo.completed;
    await todo.save();
    res.json(todo);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// PATCH  /todo-change-color/:id
app.patch("/todo-change-color/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { color } = req.body;
    const todo = await Todo.findById(id);
    if (!todo) return res.status(404).json({ message: "Todo not found" });
    todo.color = color;
    await todo.save();
    res.json(todo);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});



//DELETE /todo-delete/:id
app.delete("/todo-delete/:id", async (req, res) => {
 try {
    const { id } = req.params;
    const deleted = await Todo.findByIdAndDelete(id);
    if (!deleted) return res.status(404).json({ message: "Todo not found" });
    res.json({ deletedTodoId: id,message:"deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }

});


// Catch-all route (404 handler)
app.use((req, res) => {
  res.status(404).send({ message: "- 404 -" });
});
