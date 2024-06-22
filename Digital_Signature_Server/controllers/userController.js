const models = require("../models/index");
const path = require("path");

exports.getAllUsers = async (req, res, next) => {
  try {
    const userData = await models.User.findAll();
    if (userData.length > 0) {
      res.status(200).json({ message: "Success", data: userData });
    } else {
      res.status(200).json({ message: "There Is No Users", data: userData });
    }
  } catch (error) {
    res.status(404).json({ message: error });
  }
};

exports.addHello = (req, res, next) => {
  res.json({ message: "Hello" });
};

exports.uploadDocument = (req, res, next) => {
  res.json({
    message: "file uploaded successfully",
    path: path.relative("public", req.file.path),
  });
};
