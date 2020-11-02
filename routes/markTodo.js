const todo = require('../models/todo')
const router = require('express').Router()
const protect = require("../middlewares/protect");

router.put('/markTodo/:id', protect, async (req,res)=>{
    const toBeMarked =  await todo.findOne({_id: req.params.id})
    if(toBeMarked.userId !== req.user){res.send('Unauthorized')}

    try {
        toBeMarked.completed = !toBeMarked.completed
        await toBeMarked.save()
        res.json('marked successfully')
    } catch (error) {
        console.log(error);
        res.json('error marking todo')
    }

})

module.exports = router