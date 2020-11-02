const jwt = require("jsonwebtoken");

const protect = async (req, res, next) => {
  const token = await req.headers.auth.split(" ")[1];
  try {
    const verified = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    req.user = verified['_id']
  } catch (error) {
    return res.status(401).send('Unauthorized')
  }

  next();
};

module.exports = protect;
