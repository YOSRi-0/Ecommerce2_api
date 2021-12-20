const { Colors } = require("../models");

// add new color
const addColor = async (req, res) => {
  const { color } = req.body;

  if (!color || !color.length) {
    return res.status(400).send({ message: "Color was not provided" });
  }

  const createdColor = await Colors.create({
    value: color,
  });

  if (!createdColor) {
    return res.status(500).send({ message: "Error creating color" });
  }

  res.send(createdColor);
};

module.exports = { addColor };
