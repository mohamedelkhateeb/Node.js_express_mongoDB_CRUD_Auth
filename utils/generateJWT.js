const jwt = require("jsonwebtoken");
module.exports = async (payload) => {
  return jwt.sign(payload, process.env.JWT_SECRET_KEY, {
    expiresIn: "30m",
  });
};
