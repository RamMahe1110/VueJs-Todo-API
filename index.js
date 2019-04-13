const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const auth = require("./routes/auth");
const todos = require("./routes/todos");
const cors = require("cors");
const app = express();

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

// DB Config
const db = require("./config/keys").mongoURI;

// Connect to mongoDB
mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => {
    console.log("MongoDB Connected");
  })
  .catch(err => console.log(err));

app.use("/api/auth", auth);
app.use("/api/todos", todos);

app.listen(process.env.PORT || 5000, () => {
  console.log(`Server listening to Port ${process.env.PORT || 5000}`);
});
