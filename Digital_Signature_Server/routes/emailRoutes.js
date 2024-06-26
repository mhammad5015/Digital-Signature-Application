const express = require("express");
const router = express.Router();
const emailController = require("../controllers/emailController");
const auth = require("../middlewares/authMiddleware");

router.post("/email/sendVerify", emailController.sendVerificationEmail);

router.post("/email/sendEmail", emailController.sendSigningEmail);

router.post("/email/verify", emailController.verify);

module.exports = router;
