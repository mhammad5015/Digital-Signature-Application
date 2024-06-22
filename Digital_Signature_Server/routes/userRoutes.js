const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const isAuthed = require("../middlewares/authMiddleware");
const multer = require("../util/multer");

router.get("/getAllUsers", isAuthed, userController.getAllUsers);
router.post("/addHello", isAuthed, userController.addHello);

router.post(
  "/user/uploadFile",
  multer.uploadDocument.single("document"),
  userController.uploadDocument
);

module.exports = router;
