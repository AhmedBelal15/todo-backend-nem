const router = require("express").Router();
const todoModel = require("../models/todo");

router.post("/gettodos", async (req, res) => {
  try {
    const todos = await todoModel.find({ userId: req.body.userId }, null, {
      sort: { createdAt: -1 },
    });
    res.status(200).send(todos);
  } catch (error) {
    res.status(400).send(error);
    console.log("A7zaaaaaaan");
  }
});

module.exports = router;
