const express = require("express");
const router = express.Router();
const Todo = require("../models/Todo");
const User = require("../models/User");

router.post("/", async (req, res) => {
  let todo = await Todo.findOne({ userId: req.body.userId });
  if (!todo) {
    const temp = {
      desc: req.body.desc
    };
    // console.log("in");

    todo = new Todo({
      userId: req.body.userId
    });
    todo.todos.push(temp);
    await todo.save();
    return res.json(todo);
  }
  // console.log();

  todo.todos.push({ desc: req.body.desc });
  await todo.save();
  return res.json(todo);
});

router.put("/:todoId", async (req, res) => {
  let user = await User.findById(req.body.userId);
  if (!user) return res.status(404).json("User not found :(");
  let todo = await Todo.findOne({ userId: req.body.userId });

  if (!todo) return res.status(404).json("Todo not found :(");
  const singleTodo = todo.todos.filter(
    t => t._id.toString() === req.params.todoId.toString()
  );
  const index = todo.todos.indexOf(singleTodo[0]);
  if (req.body.msg === "descEdit") {
    todo.todos[index].desc = req.body.desc;
    await todo.save();
    return res.json(todo);
  } else {
    todo.todos[index].completed = !todo.todos[index].completed;
    await todo.save();
    return res.json(todo);
  }
});

router.delete("/:userId/:todoId", async (req, res) => {
  let user = await User.findById(req.params.userId);
  if (!user) return res.status(404).json("User not found :(");
  let todo = await Todo.findOne({ userId: req.params.userId });

  if (!todo) return res.status(404).json("Todo not found :(");
  const singleTodo = todo.todos.filter(
    t => t._id.toString() === req.params.todoId.toString()
  );
  // console.log("sadassaaad", singleTodo[0]);
  const index = todo.todos.indexOf(singleTodo[0]);
  todo.todos.splice(index, 1);

  await todo.save();
  return res.json(todo);
});

module.exports = router;
