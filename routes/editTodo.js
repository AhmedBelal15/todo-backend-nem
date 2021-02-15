const todo = require('../models/todo')
const router = require('express').Router()
const protect = require("../middlewares/protect");

router.put('/:id', protect, async (req,res)=>{
    const{title, description, toBeDoneAt} = req.body
    const toBeEdited = await todo.findOne({_id: req.params.id})
    if(toBeEdited.userId !== req.user){res.send('Unauthorized')}
    
    try {
        await toBeEdited.updateOne({title, description, toBeDoneAt })
        res.status(200).json('updated successfully')
    } catch (error) {
        res.status(400).send(error)
        console.log(error);
    }
})

module.exports = router