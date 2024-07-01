const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");
const isAdmin = require("../middlewares/adminAuthMiddleware");

router.get("/admin/getAllUsers", isAdmin, adminController.getAllUsers);

module.exports = router;
