const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Todo = require("../models/Todo");

// Registration

router.post("/register", async (req, res) => {
  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).json("User Already Exists!");
  user = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password
  });
  try {
    await user.save();
    return res.json(user);
  } catch (ex) {
    res.status(400).json("Something Went Wrong :(");
  }
});

// SignIn
router.post("/signin", async (req, res) => {
  let user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).json("User not found");

  if (req.body.password === user.password) {
    const todo = await Todo.findOne({ userId: user._id });

    if (todo) return res.json({ todo, user });
    return res.json({ user, todo: { todos: [] } });
  }
  return res.status(400).json("Invalid Email or Password");
});

module.exports = router;
