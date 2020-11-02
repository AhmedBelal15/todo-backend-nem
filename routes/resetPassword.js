const crypto = require("crypto");
const router = require("express").Router();
const nodemailer = require('nodemailer')
const User = require("../models/user");

router.post("/resetpassword", async (req, res) => {
// Check if email exist
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return res.json("this email isn't registered!");
  } else {
      res.json('an email has been sent, check it to update your password')
  }
//Create and hash token and save it to data base
  const resetToken = crypto.randomBytes(24).toString("hex");
  console.log(resetToken);
  const hashedToken = crypto
  .createHash("sha256", process.env.RESET_TOKEN_SECRET)
  .update(resetToken)
  .digest("hex");
  const tokenExpire = Date.now() + 60 * 60 * 1000;

  try {
    await  user.updateOne({
        resetPasswordToken: hashedToken,
        resetPasswordExpire: tokenExpire
      })
  } catch (error) {
      res.status(400).send(error)
  }

  //reset url
  const resetUrl = `http://localhost:3000/updatepassword/${resetToken}`
  // email
  const transport = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD
    }
  });
  const messageBody = `U recieved this email regarding the password reset request
  if u didn't send a request please ignore this email
  else you can click on this url to reset your password ${resetUrl}
  `

let info = await transport.sendMail({
    from: `${process.env.FROM_NAME} <${process.env.FROM_EMAIL}>`,
    to: req.body.email,
    subject: "Todo App password reset",
    html: messageBody
})
console.log(info.messageId);
});

module.exports = router;
