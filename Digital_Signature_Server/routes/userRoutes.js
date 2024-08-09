const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const isUser = require("../middlewares/userAuthMiddleware");
const multer = require("../util/multer");
const Validator = require("../middlewares/validators/userValidationMiddleware");

// router.post(
//   "/user/uploadIdImages",
//   isUser,
//   multer.uploadImage.fields([
//     {
//       name: "image_frontSide",
//       maxCount: 1,
//     },
//     {
//       name: "image_backSide",
//       maxCount: 1,
//     },
//   ]),
//   Validator.uploadIdImages,
//   userController.uploadIdImages
// );

router.post(
  "/user/uploadDocument",
  isUser,
  multer.uploadDocument.single("file"),
  Validator.uploadDocument,
  userController.uploadDocument
);

module.exports = router;
