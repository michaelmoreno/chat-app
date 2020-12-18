const jwt = require('jsonwebtoken');

const auth = async (req, res, next) => {
  try {
    const token = req.header("x-auth-token");
    // VALIDATION
    if (!token) {
      return res.status(401).json({ msg: "No authentication token, authorization denied."});
    }
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    if (!verified) {
      return res.status(401).json({ msg: "Token verfication failed, authorizatoin denied."})
    }
    req.user = verified.id;
    next();
  } catch (err) {
    res.status(500).json({err})
  }
}

module.exports = auth;