const { createUser, login } = require("../../controllers/Users");
const { userAuth } = require("../../middlewares/auth");

const router = require("express").Router();

router.get("/", (req, res) => {
  res.send({
    user: "first user",
    password: "first password",
  });
});

router.post("/", createUser);
router.post("/login", login);
router.get("/verify", userAuth, (req, res) => {
  if (req.user) {
    res.send(req.user);
  }
});

module.exports = router;
