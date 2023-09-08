const express = require('express')
const app = express();
const PORT = 3200;
const bodyParser = require('body-parser')
const fs = require("fs");
const path = require('path');

app.use(bodyParser.json());

app.get('/todo', (req,res) => {
    fs.readFile("D:/neeru/todoList/todos.json", "utf8", (err, data) => {
        if (err) { 
          console.log("cannot read file");
          throw err;
        }
        res.json(JSON.parse(data));
    });
})

app.post('/todo', (req,res) => {
    const newTodo = {
        id: Math.floor(Math.random() * 1000000), // unique random id
        title: req.body.title,
        description: req.body.description
      };
      fs.readFile("todos.json", "utf8", (err, data) => {
        if (err) throw err;
        const todos = JSON.parse(data);
        todos.push(newTodo);
        fs.writeFile("todos.json", JSON.stringify(todos), (err) => {
          if (err) throw err;
          res.status(201).json(newTodo);
        });
      });
})

app.delete('/todo/:id', (req,res) => {
    fs.readFile("todos.json", "utf8", (err, data) => {
        if (err) throw err;
        const todos = JSON.parse(data);
        const todoIndex = todos.findIndex(t => t.id === parseInt(req.params.id))
        if (todoIndex === -1) {
          res.status(404).send("Id not present");
        } else {
          todos.splice(todoIndex, 1);
          fs.writeFile("todos.json", JSON.stringify(todos), (err) => {
            if (err) throw err;
            res.status(200).send("Deleted Successfully");
          });
        }
      });
})

app.get("/", (req,res) => {
  res.sendFile(path.join(__dirname, "index.html"));
})

app.listen(PORT, () => {
    console.log(`Server listening on Port ${PORT}`)
})