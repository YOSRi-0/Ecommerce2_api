const { Products, Colors } = require("../models");

// create new product
const createProduct = async (req, res) => {
  const { title, description, price, img, availability, colors } = req.body;
  if (!title || !title.length) {
    return res.status(400).send({ message: "Title was not provided" });
  }
  if (!description || !description.length) {
    return res.status(400).send({ message: "Description was not provided" });
  }
  if (!price || !price.length) {
    return res.status(400).send({ message: "Price was not provided" });
  }
  if (!img || !img.length) {
    return res.status(400).send({ message: "Img was not provided" });
  }
  if (!availability || !availability.length) {
    return res.status(400).send({ message: "Availability was not provided" });
  }
  const createdProduct = await Products.create({
    title,
    price,
    img,
    description,
    availability,
    colors,
  });

  if (!createdProduct) {
    return res.status(500).send({ message: "Error creating product" });
  }

  console.log(createdProduct);
  if (colors && colors.length) {
    for (let colorValue of colors) {
      const color = await Colors.findOne({
        where: { value: colorValue },
      });
      await createdProduct.addColors(color.id);
    }
  }

  const product = await Products.findOne({
    where: { title },
    include: Colors,
  });
  res.send(product);
};

// Fetch Product
const getProduct = async (req, res) => {
  const { id } = req.params;

  const product = await Products.findOne({ where: { id }, include: Colors });

  if (!product) {
    return res.status(404).send({ message: "Product was not found" });
  }

  res.send(product);
};

// Fetch All Product
const getAllProducts = async (req, res) => {
  const products = await Products.findAll({ include: Colors });
  if (!products) {
    return res.status(500).send({ message: "Could not retrieve products" });
  }

  if (products.length === 0) {
    return res
      .status(404)
      .send({ message: "there are no products in database" });
  }

  res.send(products);
};

// Delete Product
const deleteProduct = async (req, res) => {
  const { id } = req.params;
  console.log(id);

  try {
    const product = await Products.findOne({ where: { id } });
    if (!product) {
      return res.status(404).send({ message: "Product was not found" });
    }

    await product.destroy();
    return res.send({ message: "Product was deleted!" });
  } catch (err) {
    res.status(500).send({
      message: err.message || `Could not delete product with id: ${id}`,
    });
  }
};

// Delete All Products
const deleteAllProducts = async (req, res) => {
  const products = await Products.findAll();

  if (!products.length) {
    return res
      .status(404)
      .send({ message: "There are no products in database" });
  }

  try {
    await Products.destroy({ where: {} });
    return res.send({ message: "Product was deleted!" });
  } catch (err) {
    res.status(500).send({
      message: err.message || `Could not delete products`,
    });
  }
};

// update product
const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { title, description, price, img, availability, colors } = req.body;
  if (!title || !title.length) {
    return res.status(400).send({ message: "Title was not provided" });
  }
  if (!description || !description.length) {
    return res.status(400).send({ message: "Description was not provided" });
  }
  if (!price || !price.length) {
    return res.status(400).send({ message: "Price was not provided" });
  }
  if (!img || !img.length) {
    return res.status(400).send({ message: "Img was not provided" });
  }
  if (!availability || !availability.length) {
    return res.status(400).send({ message: "Availability was not provided" });
  }

  const updatedProduct = await Products.update(
    {
      title,
      price,
      img,
      description,
      availability,
      colors,
    },
    { where: { id } }
  );

  console.log(updatedProduct);
  return;
};

module.exports = {
  deleteProduct,
  deleteAllProducts,
  getAllProducts,
  createProduct,
  getProduct,
  updateProduct,
};
