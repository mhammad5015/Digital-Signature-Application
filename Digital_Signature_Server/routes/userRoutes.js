const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const isAuthed = require("../middlewares/authMiddleware");
const multer = require("../util/multer");

router.get("/getAllUsers", isAuthed, userController.getAllUsers);

router.post(
  "/user/uploadIdImages",
  isAuthed,
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
  isAuthed,
  multer.uploadDocument.single("file"),
  userController.uploadDocument
);

module.exports = router;
