const router = require('express').Router();
const userModel = require('../models/user');
const {registerSchema,} = require('../middlewares/validation');
const bcrypt = require('bcryptjs')

router.post('/', async (req,res)=>{
//destrcuturing data
   const {name,email,password,confirmPassword} = req.body;

//Validate request

try {
    const validate = await registerSchema.validateAsync(req.body)
    console.log('validated');
} catch (error) {
     res.status(400).json(error.details[0].message)
    return
}

//Check if the email already exists
const checkEmail = await userModel.findOne({email})
if(checkEmail) return res.status(400).json('Email already exists')

//Hash Passwords
const salt = await bcrypt.genSalt(10)
const hashedPassword = await bcrypt.hash(password, salt)

//Adding new user
const user = new userModel({
        name,
        email,
        password: hashedPassword,
        confirmPassword
   })
   try {
       const savedUser = await user.save()
       const userObject= {...savedUser._doc}
       delete userObject.password
       res.json({
           msg: 'Registered',
           userObject 
       })
   } catch (error) {
       res.status(400).json(error)
   }
})

 
module.exports = router;