const express = require("express");
const router = express.Router();
const emailController = require("../controllers/emailController");
const signController = require("../controllers/digitalSigningController");
const auth = require("../middlewares/authMiddleware");


router.post("/email/sendVerify", auth, emailController.sendVerificationEmail);

router.post("/email/sendEmail", auth, emailController.sendSigningEmail);

router.post("/email/verify", auth, emailController.verify);

router.post("/encryptionRSA", signController.encryptionRSA);

router.get("/RSA", signController.RSA);

module.exports = router;
