const jwt = require("jsonwebtoken");
const config = require("../config/authConfig");

const requireAuth = (req, res, next) => {
  const token = req.body.jwt;

  if (!token) {
    res.json({ auth: false, message: "No token provided" });
  } else {
    jwt.verify(token, config.secret, (err, decodedToken) => {
      if (err) {
        console.log("Error : ", err);
        res.json({ auth: false, message: "Unauthorized user" });
        res.send("Token is not valid");
      } else {
        console.log("decodedToken :", decodedToken);
        res.json({ auth: true, message: "Authorized User, Action Successful" });
        next();
      }
    });
  }
};

module.exports = { requireAuth };
