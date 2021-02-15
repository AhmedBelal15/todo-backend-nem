// Imports
const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const mongoose = require("mongoose");
const helmet = require("helmet");

// Middlewares
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(cors());
app.use(helmet());

//import API Routes
const registerAuth = require("./routes/registerAuth");
const loginAuth = require("./routes/loginAuth");
const createTodo = require("./routes/createTodo");
const getTodos = require("./routes/getTodos");
const removeTodo = require("./routes/removeTodo");
const editTodo = require("./routes/editTodo");
const resetPassword = require("./routes/resetPassword");
const updatePassword = require("./routes/updatePassword");
const markTodo = require("./routes/markTodo");

//route middlewares
app.use("/user/register", registerAuth);
app.use("/user/login", loginAuth);
app.use("/user/resetpassword", resetPassword);
app.use("/user/updatepassword", updatePassword);

app.use("/todo/createtodo", createTodo);
app.use("/todo/gettodos", getTodos);
app.use("/todo/removetodo", removeTodo);
app.use("/todo/edittodo", editTodo);
app.use("/todo/marktodo", markTodo);
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

app.listen(process.env.PORT || 4000, () => {
  console.log(`Server is Running on Port ${process.env.PORT || 4000}`);
});