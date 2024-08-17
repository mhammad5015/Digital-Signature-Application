const express = require("express");
const router = express.Router();
const emailController = require("../controllers/emailController");
const signController = require("../controllers/digitalSigningController");
const CertificateController = require("../controllers/digitalCertificateController");

router.post("/email/sendVerify", emailController.sendVerificationEmail);

router.post("/email/sendEmail", emailController.sendSigningEmail);

router.post("/email/verify", emailController.verify);

// router.post("/encryptionRSA", signController.encryptionRSA);

router.get("/RSA", signController.RSA);

// router.post("/encryptionRSA", signController.encryptionRSA);

router.get("/email/RSA", signController.RSA);
router.post("/email/forgekey", signController.customKeyToForgeKey);
router.post("/email/Dsign", signController.digitalSigning);
router.post("/email/Vsign", signController.verifySignature);
router.get(
  "/email/createDigitalCertificate",
  CertificateController.createDigitalCertificate
);
router.post("/email/verifyCertificate", CertificateController.verifyCertificate);

module.exports = router;
