const router = require("express").Router();
const stripeController = require("../controllers/stripeController");


router.post("/create-checkout-session", stripeController.payment)
router.get("/checkout-session/:id", stripeController.paymentInfos)


module.exports = router;