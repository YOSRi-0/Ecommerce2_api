const { Users } = require("../models");
const { createJwt } = require("../util/jwt");
const bcrypt = require("bcrypt");

// Create new user
const createUser = async (req, res) => {
  // validate input
  const { username, email, password, img } = req.body;
  if (!username || !username.length) {
    return res.status(400).send({ message: "username was not entered" });
  }
  if (!email || !email.length) {
    return res.status(400).send({ message: "email was not entered" });
  }
  if (!password || !password.length) {
    return res.status(400).send({ message: "password was not entered" });
  }
  if (!img || !img.length) {
    return res.status(400).send({ message: "img url was not entered" });
  }

  // Hash password
  console.log(password);
  const hashedPassword = await bcrypt.hash(password, 10);
  console.log(hashedPassword);
  // save user
  const createdUser = await Users.create({
    username,
    email,
    img,
    password: hashedPassword,
  });

  if (!createdUser) {
    return res.status(500).send({ message: "Error creating user" });
  }

  // create token
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
    attributes: ["email", "username", "img", "password"],
  });

  if (!user) {
    return res.status(404).send({ message: "User was not found" });
  }

  const matchPassword = await bcrypt.compare(password, user.password);

  if (!matchPassword) {
    return res.status(403).send({ message: "Password is incorrect" });
  }

  console.log(user.dataValues);
  createJwt(user.dataValues)
    .then((token) => {
      delete user.dataValues.password;
      res.send({ ...user.dataValues, token });
    })
    .catch((err) => res.status(500).send({ message: "jwt creation failed" }));
};

module.exports = { login, createUser };
