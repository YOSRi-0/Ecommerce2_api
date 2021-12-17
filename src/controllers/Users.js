const { Users } = require("../models");
const { createJwt } = require("../util/jwt");

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

  const user = await Users.findOne({
    attributes: ["username", "email", "img"],
    where: {
      username: createdUser.username,
    },
  });

  createJwt(user.dataValues)
    .then((token) => res.send({ ...user.dataValues, token }))
    .catch((err) => {
      console.log(err);
      res.status(500).send({ message: "jwt creation failed" });
    });

  //res.send({ ...user.dataValues, token });
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

  console.log(user.dataValues);
  createJwt(user.dataValues)
    .then((token) => {
      delete user.password;
      res.send({ ...user.dataValues, token });
    })
    .catch((err) => res.status(500).send({ message: "jwt creation failed" }));
};

module.exports = { login, createUser };
