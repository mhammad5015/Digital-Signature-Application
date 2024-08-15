const express = require("express");
const router = express.Router();
const emailController = require("../controllers/emailController");
const signController = require("../controllers/digitalSigningController");

router.post("/email/sendVerify", auth, emailController.sendVerificationEmail);

router.post("/email/sendEmail", auth, emailController.sendSigningEmail);

router.post("/email/verify", auth, emailController.verify);

router.post("/encryptionRSA", signController.encryptionRSA);

router.get("/RSA", signController.RSA);

// router.post("/encryptionRSA", signController.encryptionRSA);

router.get("/email/RSA", signController.RSA);
router.post("/email/forgekey", signController.customKeyToForgeKey);
router.post("/email/Dsign", signController.digitalSigning);

module.exports = router;
