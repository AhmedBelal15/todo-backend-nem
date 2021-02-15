const router = require("express").Router();
const todo = require("../models/todo");
const protect = require("../middlewares/protect");

router.delete("/:id", protect,async (req, res) => {
  const toBeRemoved = await todo.findOne({_id: req.params.id})
  if(req.user !== toBeRemoved.userId){return res.status(401).send('Unauthorized')}
  try {
    await toBeRemoved.deleteOne()
    res.status(202).send('Deleted Successfully')
  } catch (error) {
      res.status(400).send(error)
  }
});

module.exports = router;
