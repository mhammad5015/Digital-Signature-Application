const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const Validator = require("../middlewares/validators/authValidationMiddleware");
const multer = require("../util/multer");

// routes:
router.post(
  "/user/register",
  Validator.userRegisterValidation,
  authController.userRegister
);
router.post(
  "/user/login",
  Validator.userLoginValidation,
  authController.userLogin
);

router.post(
  "/admin/login",
  Validator.adminLoginValidation,
  authController.adminLogin
);

module.exports = router;
