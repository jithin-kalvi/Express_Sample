const express = require("express");
const app = express();
const port = 3000;

// middle ware
app.use(express.json())

// start express
app.listen(port,() => {
  console.log(`Test app listening at http://localhost:${port}`)
})

// Data store 
const todos = [
  {
    title: "Todo 1",
    id: "1",
    desc: "This is my first Todo",
    completed: true,
  },
  {
    title: "Todo 2",
    desc: "This is my second Todo",
    completed: true,
  },

  {
    title: "Todo 3",
    desc: "This is my third Todo",
    completed: true,
  },

  {
    title: "Todo 4",
    desc: "This is my fourth Todo",
    completed: true,
  },

  {
    title: "Todo 5",
    desc: "This is my fifth Todo",
    completed: true,
  },
];


// controller
app.get("/todos", (request, response) => {
  // query parms
  if(request.query.title)
  {
    console.log(request.query.title)
    const todo = todos.find((todo) => todo.title === request.query.title);
    response.status(200).json(todo);
  }
  else{
    response.status(200).json(todos);
  }
   
  });

  // post
  app.post("/todos", (request, response) => {
    todos.push(request.body);
    response.status(201).json({ msg: "Todo created successfully" });
  });

  app.put("/todos/:id", (request, response) => {
    const todo = todos.find((todo) => todo.id === request.params.id);
    if (todo) {
      const { title, desc, completed } = request.body;
      todo.title = title;
      todo.desc = desc;
      todo.completed = completed;
      response.status(200).json({ msg: "Todo updated successfully" });
      return;
    }
    response.status(404).json({ msg: "Todo not found" });
  });

  app.delete("/todos/:id", (request, response) => {
    console.log(request.params.id)
    const todoIndex = todos.findIndex((todo) => (todo.id = request.params.id));
    console.log(todoIndex)
    if (todoIndex!=undefined) {
      todos.splice(todoIndex, 1);
      response.status(200).json({ msg: "Todo deleted successfully" });
    }
    response.status(404).json({ msg: "Todo not found" });
  });