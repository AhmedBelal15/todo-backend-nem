const router = require("express").Router();
const User = require("../models/user");
const crypto = require("crypto");
const { passwordSchema } = require('../middlewares/validation');
const bcrypt = require("bcryptjs");

router.put("/:resetToken", async (req, res) => {
  //find the user with the token
  const resetToken = req.params.resetToken;
  const hashedToken = crypto
    .createHash("sha256", process.env.RESET_TOKEN_SECRET)
    .update(resetToken)
    .digest("hex");
  const user = await User.findOne({
    resetPasswordToken: hashedToken,
    resetPasswordExpire: { $gt: Date.now() },
  });
  if (!user) {
    return res.json("token invalid");
  }
  // validate password
  try {
    const validate = await passwordSchema.validateAsync(req.body);
    if (validate) {
      console.log("validated");
    }
  } catch (error) {
    return res.status(400).json(error.details[0].message);
  }
  // hash new password using bcrypt
  const password = req.body.password;
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  //update password / revoke tokens
  user.password = hashedPassword
  user.resetPasswordToken = undefined
  user.resetPasswordExpire = undefined
  const updated = await user.save()
  if(updated){return res.json('Password Updated successfully')} else {return res.json('token invalid')}
});

module.exports = router;
