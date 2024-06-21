const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const Validator = require("../middlewares/validationMiddleware");
const multer = require("multer");

const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/storage/images");
  },
  filename: (req, file, cb) => {
    uniqueID = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueID + "-" + file.originalname);
  },
});

// const fileFilter = (req, file, cb) => {
//   if (
//     file.mimetype === "image/jpeg" ||
//     file.mimetype === "image/jpg" ||
//     file.mimeype === "image/png"
//   ) {
//     cb(null, true);
//   } else {
//     cb(null, false);
//   }
// };

const upload = multer({ storage: fileStorage});

// routes:
router.post(
  "/user/register",
  upload.fields([
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
