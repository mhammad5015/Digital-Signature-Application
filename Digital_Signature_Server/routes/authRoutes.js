const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const Validator = require("../middlewares/validationMiddleware");
const multer = require("../util/multer");

// routes:
router.post(
  "/user/register",
  multer.uploadImage.fields([
    {
      name: "image_frontSide",
      maxCount: 1,
    },
    {
      name: "image_backSide",
      maxCount: 1,
    },
  ]),
  Validator.registerValidation,
  authController.register
);

router.post("/user/login", Validator.loginValidation, authController.login);

module.exports = router;
