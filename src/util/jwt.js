const jwt = require("jsonwebtoken");

const JWT_SECRET = "R4R4R4R4RRRRKZEKRKZ4KF4213K2KK232";

const createJwt = async (user) => {
  const token = await jwt.sign(user, JWT_SECRET);
  return token;
};

const verifyJwt = async (token) => {
  const user = await jwt.verify(token, JWT_SECRET);
  console.log(user);
  return user;
};

module.exports = { createJwt, verifyJwt };
