const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
exports.jwtVerify = async (token) => {
  const user = jwt.verify(token, process.env.JWT_PASS);
  const validUser = await User.findOne({ email: user.email, password: user.password });
  if (validUser) {
    return validUser;
  } else {
    return false;
  }
};
