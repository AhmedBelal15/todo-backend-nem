const router = require("express").Router();
const todoModel = require("../models/todo");
const protect = require("../middlewares/protect");

router.get("/", protect, async (req, res) => {
  const userId = req.user
  const page = parseInt(req.query.page) 
  const limit = parseInt(req.query.limit)
  const startIndex = (page - 1) * limit
  const endIndex = page * limit
  
  const results = {}

  if (endIndex < await todoModel.countDocuments().exec()) {
    results.next = {
      page: page + 1,
      limit: limit
    }
  }
  if (startIndex > 0) {
    results.previous = {
      page: page - 1,
      limit: limit
    }
  }
  
  
  try {
    results.todos = await todoModel.find({ userId }, null, {
      sort: { createdAt: -1 },
    }).limit(limit).skip(startIndex).exec()
    res.status(200).send(results);
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = router;
