const router = require("express").Router();
const todoModel = require("../models/todo");
const protect = require("../middlewares/protect");

router.post("/createtodo", protect, async (req, res) => {
  //destructuring
  const { userId, title, description, toBeDoneAt, completed } = req.body;
  //create new Todo
  const todo = new todoModel({
    userId,
    title,
    description,
    toBeDoneAt,
    completed,
  });

  if (req.user !== userId) {
    return res.status(401).send('Unauthorized');
  }

  try {
    const savedTodo = await todo.save();
    res.send(savedTodo);
  } catch (error) {
    res.status(400).send(error);
    console.log(error._message);
  }
});

module.exports = router;