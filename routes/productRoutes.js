const router = require("express").Router();
const productController = require("../controllers/productController");
const { verifyTokenAndAdmin} = require("./verifyToken")

router.post("/", productController.createProduct)
router.put("/:id", verifyTokenAndAdmin, productController.updateProduct)
router.delete("/:id", verifyTokenAndAdmin, productController.deleteProduct)
router.get("/find/:id", productController.getProduct)
router.get("/",productController.getAllProducts)

router.put("/reviews/:id", productController.addReviews)
router.post("/isAlreadyBought/:id", productController.isAlreadyBought)

module.exports = router;
