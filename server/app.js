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

});



app.get("/login", async (req, res) => {

});


//  GET /get-todos?userId=xyz
app.get("/get-todos", async (req, res) => {

});


// POST /todo-add
app.post("/todo-add", async (req, res) => {

});


// PUT /todo-edit/:id
app.put("/todo-edit/:id", async (req, res) => {

});


//DELETE /todo-delete/:id
app.delete("/todo-delete/:id", async (req, res) => {

});


// Catch-all route (404 handler)
app.use((req, res) => {
  res.status(404).send({ message: "- 404 -" });
});
