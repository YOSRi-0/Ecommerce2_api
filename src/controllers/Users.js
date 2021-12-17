const { Users } = require("../models");

// Create new user
const createUser = async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !username.length) {
    return res.status(400).send({ message: "username was not entered" });
  }
  if (!email || !email.length) {
    return res.status(400).send({ message: "email was not entered" });
  }
  if (!password || !password.length) {
    return res.status(400).send({ message: "password was not entered" });
  }

  const createdUser = await Users.create({
    username,
    email,
    password,
  });

  if (!createdUser) {
    return res.status(500).send({ message: "Error creating user" });
  }

  res.send(createdUser);
};

// Login user
const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !email.length) {
    return res.status(400).send({ message: "email was not entered" });
  }
  if (!password || !password.length) {
    return res.status(400).send({ message: "password was not entered" });
  }

  const user = await Users.findOne({
    where: {
      email: email,
    },
  });

  if (!user) {
    return res.status(404).send({ message: "User was not found" });
  }

  if (user.password !== password) {
    return res.status(403).send({ message: "Password is incorrect" });
  }

  res.send(user);
};

module.exports = { login, createUser };
