const jwt = require("jsonwebtoken");
const { JWT } = require("../config");

const auth = (req, res, next) => {
  try {
    const token = req.header("x-auth-token");
    //Not a verified token
    if (!token)
      return res
        .status(401)
        .json({ msg: "No authentication token, authorization denied." });

    // const verified = jwt.verify(token, process.env.JWT_SECRET);
    //With varified token
    const verified = jwt.verify(token, JWT);
    if (!verified)
      return res
        .status(401)
        .json({ msg: "Token verification failed, authorization denied." });
    console.log(verified);
    req.user = verified.id;
    next();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = auth;
