const { addColor } = require("../../../controllers/Colors");
const {
  createProduct,
  getProduct,
  getAllProducts,
  deleteProduct,
  deleteAllProducts,
} = require("../../../controllers/Products");

const router = require("express").Router();

router.post("/", createProduct);
router.get("/:id", getProduct);
router.get("/", getAllProducts);
router.delete("/:id", deleteProduct);
router.delete("/", deleteAllProducts);

router.post("/color", addColor);

module.exports = router;
