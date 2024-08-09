const models = require("../models/index");
const path = require("path");
const CustomError = require("../util/CustomError");



exports.uploadDocument = async (req, res, next) => {
  try {
    let doc = await models.Document.create({
      fileName: req.body.fileName,
      file: path.relative("public", req.file.path),
    });
    res.json({
      message: "Document uploaded successfully",
      data: doc,
    });
  } catch (err) {
    next(err);
  }
};
