const todo = require('../models/todo')
const router = require('express').Router()

router.put('/editTodo/:id', async (req,res)=>{
    const{title, description, toBeDoneAt} = req.body
    try {
        await todo.findByIdAndUpdate({_id: req.params.id}, {title, description, toBeDoneAt })
        res.status(402).send('updated successfully')
    } catch (error) {
        res.status(400).send(error)
    }
})

module.exports = router