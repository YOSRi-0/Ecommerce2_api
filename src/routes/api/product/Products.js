const { addColor } = require("../../../controllers/Colors");
const {
  createProduct,
  getProduct,
  getAllProducts,
  deleteProduct,
  deleteAllProducts,
  updateProduct,
} = require("../../../controllers/Products");

const router = require("express").Router();

router.post("/", createProduct);
router.post("/color", addColor);

router.get("/:id", getProduct);
router.get("/", getAllProducts);

router.delete("/:id", deleteProduct);
router.delete("/", deleteAllProducts);

router.put("/:id", updateProduct);

module.exports = router;
