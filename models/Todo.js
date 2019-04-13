const mongoose = require("mongoose");

//Create Schema
const Schema = mongoose.Schema;
const TodoSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "users"
  },
  todos: [
    {
      desc: {
        type: String,
        required: true
      },
      completed: {
        type: Boolean,
        default: false
      },
      date: {
        type: Date,
        default: Date.now
      }
    }
  ]
});

module.exports = Todo = mongoose.model("todos", TodoSchema);
