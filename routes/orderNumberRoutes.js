const router = require("express").Router();
const orderNumberController = require("../controllers/orderNumberController");


router.post("/", orderNumberController.createOrderNumber)
router.get("/", orderNumberController.getOrderNumber)
router.post("/update", orderNumberController.updateOrderNumber)



module.exports = router;

