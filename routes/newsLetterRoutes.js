const router = require("express").Router();
const  newsLetterController  = require("../controllers/newsLetterController");

router.post("/", newsLetterController.createNewsLetter)
router.post("/news", newsLetterController.news)
router.get("/", newsLetterController.getNewsLetter)

module.exports = router;