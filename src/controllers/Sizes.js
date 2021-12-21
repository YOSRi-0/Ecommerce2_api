const { Sizes } = require("../models");

// add new size
const addSize = async (req, res) => {
  const { size } = req.body;
  if (!size || !size.length) {
    return res.status(400).send({ message: "Size was not provided" });
  }

  const createdSize = await Sizes.create({
    value: size,
  });

  if (!createdSize) {
    return res.status(500).send({ message: "Error while creating new size" });
  }

  res.send(createdSize);
};

module.exports = { addSize };
