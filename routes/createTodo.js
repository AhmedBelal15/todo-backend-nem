const router = require('express').Router();
const todoModel = require('../models/todo');
// const protect = require('../authenticateToken')

router.post('/createtodo',async (req,res)=>{
    //destructuring
    const {userId, title, description, createdAt, toBeDoneAt, completed} = req.body;

    //create new Todo
    const todo = new todoModel({
        userId,
        title,
        description,
        createdAt,
        toBeDoneAt,
        completed
    })  
    try {
        const savedTodo = await todo.save()
        res.send(savedTodo)  
    } catch (error) {
        res.status(400).send(error)
        console.log(error);
    }
    
})

module.exports = router