const router = require("express").Router();
const todo = require("../models/todo");
router.delete("/removeTodo/:id", async (req, res) => {
  try {
    await todo.findByIdAndRemove(req.params.id);
    res.status(202).send('Deleted Successfully')
  } catch (error) {
      res.status(400).send(error)
  }
});

module.exports = router;
