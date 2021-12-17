const { createUser, login } = require("../../controllers/Users");

const router = require("express").Router();

router.get("/", (req, res) => {
  res.send({
    user: "first user",
    password: "first password",
  });
});

router.post("/", createUser);
router.post("/login", login);

module.exports = router;
