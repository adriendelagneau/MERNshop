const router = require("express").Router();
const orderController = require("../controllers/orderController");
const {verifyToken, verifyTokenAndAdmin, verifyTokenAndAuthorization} = require("./verifyToken")

router.post("/", orderController.createOrder)
router.put("/:id", verifyTokenAndAdmin, orderController.updateOrder)
router.delete("/", verifyTokenAndAdmin, orderController.deleteOrder)
router.get("/find/:userId",  orderController.getUserOrders)
router.get("/", verifyTokenAndAdmin, orderController.getAllOrders)


router.get("/yearlyIncome", verifyTokenAndAdmin, orderController.getYearlyIncome)
router.get("/monthlyIncome", verifyTokenAndAdmin, orderController.getMounthlyIncome)
router.get("/monthlyOrders", verifyTokenAndAdmin, orderController.getMounthlyOrders)

module.exports = router;

