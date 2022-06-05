const router = require("express").Router();
const authController = require("../controllers/authController");
const { verifyTokenAndAdmin} = require("../routes/verifyToken")

// auth

router.post("/register", authController.signUp);
router.post("/login", authController.signIn);
router.get("/logout",  authController.logout);


router.get("/verify/:id/:token", authController.verify)
router.post("/password-reset", authController.passworReset)

router.get("/changePwd/:id/:token", authController.verifyPwd)
router.put("/newPwd" , authController.newPwd)

router.put("/newPwdUser" , authController.newPwdUser)
router.post("/isEmailExist", authController.isEmailExist)





module.exports = router;
