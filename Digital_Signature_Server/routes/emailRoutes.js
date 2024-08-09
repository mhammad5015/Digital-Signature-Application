const express = require("express");
const router = express.Router();
const emailController = require("../controllers/emailController");
const signController = require("../controllers/digitalCertificateController");
// const auth = require("../middlewares/authMiddleware");

router.post("/email/sendVerify", emailController.sendVerificationEmail);

router.post("/email/sendEmail", emailController.sendSigningEmail);

router.post("/email/verify", emailController.verify);

// router.post("/encryptionRSA", signController.encryptionRSA);

router.get(
  "/email/createDigitalCertificate",
  signController.createDigitalCertificate
);

module.exports = router;
