const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const isUser = require("../middlewares/userAuthMiddleware");
const multer = require("../util/multer");


router.post(
  "/user/uploadIdImages",
  isUser,
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
  userController.uploadIdImages
);
router.post(
  "/user/uploadDocument",
  isUser,
  multer.uploadDocument.single("file"),
  userController.uploadDocument
);

module.exports = router;
