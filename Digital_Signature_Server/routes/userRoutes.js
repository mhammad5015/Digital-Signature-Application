const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const isAuthed = require("../middlewares/authMiddleware");

router.get("/getAllUsers", isAuthed, userController.getAllUsers);
router.post("/addHello", isAuthed, userController.addHello);

module.exports = router;
