const router = require("express").Router();

router.get("/", (req, res) => {
  res.send({
    user: "first user",
    password: "first password",
  });
});

module.exports = router;
