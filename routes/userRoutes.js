const router = require("express").Router();
const userController = require("../controllers/userController");
const { verifyTokenAndAdmin, verifyTokenAndAuthorization} = require("./verifyToken")


router.put("/:id", verifyTokenAndAuthorization, userController.updateUser)
router.delete("/:id", verifyTokenAndAuthorization, userController.deleteUser)
router.get("/find/:id", verifyTokenAndAdmin, userController.getUser)
router.get("/", userController.getAllUsers)////////////////////
router.get("/stats", userController.getUserStats)

module.exports = router;