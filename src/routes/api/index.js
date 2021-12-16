const router = require("express").Router();

router.use("/users", require("./Users"));
router.use("/products", require("./product"));

module.exports = router;
