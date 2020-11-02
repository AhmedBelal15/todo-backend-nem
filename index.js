// Imports
const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const mongoose = require("mongoose");
const helmet = require('helmet')

// Middlewares
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(cors());
app.use(helmet())

//import API Routes
const registerAuth = require("./routes/registerAuth");
const loginAuth = require("./routes/loginAuth");
const createTodo = require("./routes/createTodo");
const getTodos = require("./routes/getTodos");
const removeTodo = require("./routes/removeTodo");
const editTodo = require("./routes/editTodo");
const resetPassword = require('./routes/resetPassword')
const updatePassword = require('./routes/updatePassword')
const markTodo = require('./routes/markTodo')

//route middlewares
app.use("/api/user", registerAuth);
app.use("/api/user", loginAuth);
app.use("/api/user", createTodo);
app.use("/api/user", getTodos);
app.use("/api/user", removeTodo);
app.use("/api/user", editTodo);
app.use('/api/user', resetPassword)
app.use('/api/user', updatePassword)
app.use('/api/user', markTodo)
// Connect to database
mongoose
  .connect(process.env.DB_CONNECTION, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log("connected to db");
  })
  .catch((err) => {
    console.log(err);
  });

app.get("/", (req, res) => {
  res.set({
    "Content-Security-Policy": "script-src 'self' ",
  });
  res.send("Heloooo");
  console.log(req.body);
});

app.listen(4000, () => {
  console.log("Server is Running on Port 4000");
});
