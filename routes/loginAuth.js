const bcrypt = require('bcryptjs');
const router = require('express').Router();
const {loginSchema} = require('../middlewares/validation');
const jwt = require('jsonwebtoken');
const User = require('../models/user');



router.post('/', async (req,res)=>{
//destructuring
const {email,password} = req.body


//Validate request

try {
    const validate = await loginSchema.validateAsync(req.body)
    if (validate) {console.log('validated');}
} catch (error) {
     res.status(400).json(error.details[0].message)
    return
}

//grab user from database
const user = await User.findOne({email: email.toLowerCase()})

//check against email
if (!user) {
    console.log('Password or Email is not correct');
    return res.status(400).json('Password or Email is not correct!')}

//check against password

    const hashedPassword = user.password
    const compare = await bcrypt.compare(password, hashedPassword)   

if(compare === true) {

    const accessToken = jwt.sign({_id: user._id }, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '1d'})
    const refreshToken = jwt.sign({_id: user._id}, process.env.REFRESH_TOKEN_SECRET, {expiresIn: '30d'})
    const userObject = {...user._doc}
    delete(userObject.password)
    res.json({
        msg: 'logged in',
        accessToken,
        refreshToken,
        userObject
    })
} else {
   return res.status(400).json('Password or Email is not correct!')
}

})


module.exports = router;