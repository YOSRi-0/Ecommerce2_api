const { verifyJwt } = require("../util/jwt");

const userAuth = async (req, res, next) => {
  const auth = req.header("Authorization");
  if (!auth) {
    return res.status(403).send({ message: "Only for logged in users" });
  }

  if (!auth.startsWith("Token")) {
    return res
      .status(400)
      .send({ message: "Authorization format not supported" });
  }

  const token = auth.substr(6);
  try {
    const user = await verifyJwt(token);
    if (user) {
      req.user = user;
      return next();
    }
  } catch (err) {
    return res.status(400).send({ message: err.message });
  }
};

module.exports = { userAuth };
